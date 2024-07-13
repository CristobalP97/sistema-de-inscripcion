from django import forms
from . models import *

class Persona_Reg(forms.ModelForm):
    class Meta:
        model = persona
        fields = [
            'nombres',
            'apellidos',
            'cedula',
            'fec_nac',
            'edad',
            'sexo',
        ]
        widgets = {
            'nombres': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
            'apellidos': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
            'cedula': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
            'fec_nac': forms.DateInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5', 'type':'date'}),
            'edad': forms.NumberInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
            'sexo': forms.Select(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
        }
        
class Estudiante_reg(forms.ModelForm):
    class Meta:
        model = estudiante
        fields = [
            'ced_estudiantil',
            'grado',
            'lugar_nac',
            'repite',
        ]
        widgets = {
            'ced_estudiantil' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
            'grado' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
            'lugar_nac' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
            'repite' : forms.CheckboxInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
        }



class Relacion_Reg(forms.ModelForm):
    class Meta:
        model = relacion
        fields = [
            'vinculo', 
        ]
        widgets = {
            'vinculo' : forms.Select(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block mx-auto p-2.5'}),
        }

class Info_contacto_Reg(forms.ModelForm):
    class Meta:
        model = info_contacto
        fields = [
            'direccion',
            'telefono',
        ]
        widgets = {
            'direccion' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
            'telefono' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
        }

class tallas_Reg(forms.ModelForm):
    class Meta:
        model = tallas
        fields = [
            'camisa',
            'pantalon',
            'estatura',
            'peso',
        ]
        widgets = {
            'camisa' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
            'pantalon' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
            'estatura' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
            'peso' : forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block-inline p-2.5'}),
        }

class enfermedad_Reg(forms.ModelForm):
    use_required_attribute = False
    class Meta:
        model = enfermedad
        fields = [
            'enfermedad'
        ]

        widgets = {
                    'enfermedad': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'}),
                        }