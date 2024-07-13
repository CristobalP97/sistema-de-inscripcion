                        if (json['ced_estudiantil'] == json['fk_persona']['cedula']){
                            cedula = 'No posee'
                        }
                        else{
                            cedula = json['fk_persona']['cedula']
                        }
                        switch(json['fk_persona']['sexo']){
                            case 'H': genero = 'Niño'; break;
                            case 'M': genero = 'Niña'; break;
                        }
                        switch(json['repite']){
                            case true: repite = 'Si'; break;
                            case false: genero = 'No'; break;
                        }
                        switch(json['fk_representante']['fk_relacion']['vinculo']){
                            case 'P': vinculo = 'Papá'; break;
                            case 'M': vinculo = 'Mamá'; break;
                            case 'T': vinculo = 'Tio(a)'; break;
                            case 'A': vinculo = 'Abuelo(a)'; break;
                            case 'H': vinculo = 'Hermano(a)'; break;
                        }
                        `
                        <table class="w-full text-sm text-left text-gray-500 ">
                        <tr class="text-xs text-gray-700 uppercase bg-gray-50">
                            <th scope="col" class="px-4 py-3">Ced. Escolar</th>
                            <th scope="col" class="px-4 py-3">Cedula</th>
                            <th scope="col" class="px-4 py-3">Nombres y Apellidos</th>
                            <th scope="col" class="px-4 py-3">Lugar de Nacimiento</th>
                            <th scope="col" class="px-4 py-3">Fecha de Nacimiento</th>
                            <th scope="col" class="px-4 py-3">Edad</th>
                        </tr>
                        <tr class="border-b :border-gray-700">
                            <td class="px-4 py-3">${json['ced_estudiantil']}</td>
                            <td class="px-4 py-3">
                                ${cedula}
                            </td>
                            <td class="px-4 py-3">${json['fk_persona']['nombres']} ${json['fk_persona']['apellidos']}</td>
                            <td class="px-4 py-3">${json['lugar_nac']}</td>
                            <td class="px-4 py-3">${json['fk_persona']['fec_nac']}</td>
                            <td class="px-4 py-3">${json['fk_persona']['edad']}</td>
                        </tr>
                        <tr>
                            <th scope="col" class="px-4 py-3">Genero</th>
                            <th scope="col" class="px-4 py-3">Repite</th>
                            <th scope="col" class="px-4 py-3">Camisa</th>
                            <th scope="col" class="px-4 py-3">Pantalon</th>
                            <th scope="col" class="px-4 py-3">Zapato</th>
                            <th scope="col" class="px-4 py-3">Peso</th>
                            <th scope="col" class="px-4 py-3">Enfermedad</th>
                        </tr>

                        <tr class="border-b :border-gray-700">
                            <td class="px-4 py-3">${genero}
                            </td>
                            <td class="px-4 py-3">${repite}
                            </td>
                            <td class="px-4 py-3">${json['fk_tallas']['camisa']}
                            </td>
                            <td class="px-4 py-3">${json['fk_tallas']['pantalon']}
                            </td>
                            <td class="px-4 py-3">${json['fk_tallas']['estatura']}
                            </td>
                            <td class="px-4 py-3">${json['fk_tallas']['peso']}
                            </td>
                        </tr>

                        <tr>
                            <th scope="col" class="px-4 py-3">Cedula del Representante</th>
                            <th scope="col" class="px-4 py-3">Nombres y apellidos</th>
                            <th scope="col" class="px-4 py-3">Fecha de Nacimiento</th>
                            <th scope="col" class="px-4 py-3">Parentesco</th>
                            <th scope="col" class="px-4 py-3">Dirección</th>
                            <th scope="col" class="px-4 py-3">Telefono</th>          
                        </tr>

                        <tr class="border-b :border-gray-700">
                            <td class="px-4 py-3">${json['fk_representante']['fk_relacion']['fk_persona']['cedula']}
                            </td>
                            <td class="px-4 py-3">${json['fk_representante']['fk_relacion']['fk_persona']['nombres']} ${json['fk_representante']['fk_relacion']['fk_persona']['apellidos']}
                            </td>
                            <td class="px-4 py-3">${json['fk_representante']['fk_relacion']['fk_persona']['fec_nac']}
                            </td>
                            <td class="px-4 py-3">${vinculo}
                            </td>
                            <td class="px-4 py-3">${json['fk_representante']['fk_info_cont']['direccion']}
                            </td>
                            <td class="px-4 py-3">
                                ${json['fk_representante']['fk_info_cont']['telefono']}
                            </td>
                        </tr>
                        </table>
                        `




           
            

                       