from django import forms
from .models import Resume
from PyPDF2 import PdfReader

class ResumeForm(forms.ModelForm):
    class Meta:
        model = Resume
        fields = ['pdf']

    def clean_pdf(self):
        pdf = self.cleaned_data.get('pdf')

        # Check if the uploaded file exists
        if not pdf:
            raise forms.ValidationError("No file uploaded.")

        # Check file extension
        if not pdf.name.endswith('.pdf'):
            raise forms.ValidationError("Only PDF files are allowed.")

        # Check file size (limit: 5MB)
        if pdf.size > 5 * 1024 * 1024:  # 5MB
            raise forms.ValidationError("The file size exceeds the 5MB limit.")

        # Check the number of pages
        try:
            reader = PdfReader(pdf)
            if len(reader.pages) != 1:
                raise forms.ValidationError("The PDF must contain exactly 1 page.")
        except Exception as e:
            raise forms.ValidationError("Invalid PDF file. Unable to read content.")

        return pdf
