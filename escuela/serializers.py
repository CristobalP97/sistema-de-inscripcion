from . import models
from rest_framework import serializers

class personaSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.persona
		fields = ('nombres','apellidos','cedula','fec_nac','edad','sexo',)

class relacionSerializer(serializers.ModelSerializer):
	fk_persona = personaSerializer()
	class Meta:
		model = models.relacion
		fields = ('vinculo','fk_persona',)

class info_contactoSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.info_contacto
		fields = ('direccion','telefono',)

class tallasSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.tallas
		fields = ('camisa','pantalon','estatura','peso',)

class representanteSerializer(serializers.ModelSerializer):
	fk_relacion = relacionSerializer()
	fk_info_cont = info_contactoSerializer()
	class Meta:
		model = models.representante
		fields = ('fk_relacion','fk_info_cont',)

class estudianteSerializer(serializers.ModelSerializer):
	fk_persona = personaSerializer()
	fk_representante = representanteSerializer()
	fk_tallas = tallasSerializer()
	class Meta:
		model = models.estudiante
		fields = ('ced_estudiantil','fk_persona','lugar_nac','seccion','grado','repite','fk_representante','fk_tallas',)

class enfermedadSerializer(serializers.ModelSerializer):
	class Meta:
		model = models.enfermedad
		fields = ('enfermedad',)