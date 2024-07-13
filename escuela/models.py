from django.db import models

# Create your models here.
class persona(models.Model):

    GENERO = [("H","Hombre"),("M","Mujer"),]

    nombres = models.CharField(max_length=150)
    apellidos = models.CharField(max_length=150)
    cedula = models.CharField(max_length=9, unique=True)
    fec_nac = models.DateField()
    edad = models.IntegerField()
    sexo = models.CharField(max_length=2, choices=GENERO)

class relacion(models.Model):

    PARENTESCO = [("P","Papá"),("M","Mamá"),("T","Tio(a)"),("A","Abuelo(a)"),("H","Hermano(a)"),]

    vinculo = models.CharField(max_length=2, choices=PARENTESCO)
    fk_persona = models.ForeignKey(persona, on_delete=models.CASCADE)

class info_contacto(models.Model):

    direccion = models.CharField(max_length=150)
    telefono = models.CharField(max_length=150)

class representante(models.Model):

    fk_relacion = models.OneToOneField(relacion, on_delete=models.CASCADE)
    fk_info_cont = models.ForeignKey(info_contacto, on_delete=models.CASCADE)


class tallas(models.Model):

    camisa = models.CharField(max_length=10)
    pantalon = models.CharField(max_length=10)
    estatura = models.CharField(max_length=10)
    peso = models.CharField(max_length=10)


class estudiante(models.Model):

    ced_estudiantil = models.CharField(max_length=9, unique=True)
    #grado = models.CharField(max_length=2)
    lugar_nac = models.CharField(max_length=200)
    seccion = models.CharField(max_length=100)
    grado = models.IntegerField()
    repite = models.BooleanField(default=False)
    fk_persona = models.OneToOneField(persona, on_delete=models.CASCADE)
    fk_representante = models.ForeignKey(representante, on_delete=models.CASCADE)
    fk_tallas = models.OneToOneField(tallas, on_delete=models.CASCADE)
    activo = models.BooleanField(default=True)

class familiares(models.Model):

    fk_estudiante = models.OneToOneField(estudiante, on_delete=models.CASCADE)
    fk_relacion = models.ForeignKey(relacion, on_delete=models.CASCADE)


class enfermedad(models.Model):

    enfermedad = models.CharField(max_length=150)
    fk_estudiante = models.ForeignKey(estudiante, on_delete=models.CASCADE)