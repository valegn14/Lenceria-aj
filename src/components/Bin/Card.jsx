import React from "react";
import CsvToJsonAndTable2 from "./CsvToJsonAndTable2";
// Importa las imagenes
import WindTurbineImage from "./molinos.jpg";
import BiomasaImage from "./biomasa.jpg";
import GeotermicaImage from "./geotermica.jpg";
import solarImage from "./solar.jpg";

const Card = () => {
    return (
        <section className='py-16 bg-white'>
            <div className='container mx-auto px-4'>
                <h2 className='text-4xl font-bold text-gray-800 mb-8 text-center'>
                    Solar Energy: Powering a Sustainable Future
                </h2>
                {/* Sección: Energía solar */}
                <div className='space-y-8  w-3/4 mx-auto'>
                    <div className='flex flex-col md:flex-row items-center bg-[#EBF3E8] rounded-2xl p-8 shadow-lg shadow-[#A1D6B2]'>
                        {/* Imagen */}
                        <img
                            src={solarImage}
                            alt='Energía solar'
                            className='w-full md:w-1/5 rounded-lg mb-6 md:mb-0 md:mr-8'
                        />
                        {/* Texto */}
                        <div className='text-gray-800'>
                            <h3 className='text-3xl font-bold mb-4'>
                                Energía Solar
                            </h3>
                            <p className='text-lg leading-relaxed'>
                                La energía solar es una fuente de energía
                                renovable que aprovecha la radiación del sol
                                para generar electricidad o calor. Funciona
                                principalmente a través de dos tecnologías: la
                                solar fotovoltaica, que utiliza paneles solares
                                con células de silicio para convertir la luz
                                solar en electricidad mediante el efecto
                                fotovoltaico, y la solar térmica, que capta el
                                calor del sol para calentar agua o producir
                                vapor y generar electricidad. Esta energía es
                                limpia, abundante y sostenible, aunque su
                                eficiencia depende de factores como el clima y
                                la capacidad de almacenamiento. Su
                                implementación reduce costos energéticos,
                                emisiones de gases contaminantes y la
                                dependencia de combustibles fósiles,
                                convirtiéndola en una solución clave para un
                                futuro energético sostenible.
                            </p>
                        </div>
                    </div>
                    <h3 className='text-4xl  text-gray-800 mb-8 text-center'>
                        Discover more renewable energies
                    </h3>
                    <div className='flex flex-col md:flex-row items-center bg-[#EBF3E8] rounded-2xl p-8 shadow-lg shadow-[#A1D6B2]'>
                        {/* Imagen */}
                        <img
                            src={WindTurbineImage}
                            alt='Energía Eólica'
                            className='w-full md:w-1/5 rounded-lg mb-6 md:mb-0 md:mr-8'
                        />
                        {/* Texto */}
                        <div className='text-gray-800'>
                            <h3 className='text-3xl font-bold mb-4'>
                                Energía Eólica
                            </h3>
                            <p className='text-lg leading-relaxed'>
                                La energía eólica es la que se obtiene del
                                viento. Por medio de un aerogenerador eólico, se
                                aprovecha la energía cinética de las masas de
                                aire en movimiento, transformándola en
                                electricidad. Es una fuente de energía limpia y
                                renovable que contribuye a reducir las emisiones
                                de carbono y a combatir el cambio climático.
                            </p>
                        </div>
                    </div>
                    {/* Nueva Sección: Energía Eólica */}
                    <div className='flex flex-col md:flex-row items-center bg-[#F6FFDE] rounded-2xl p-8 shadow-lg shadow-[#A1D6B2]'>
                        {/* Imagen */}
                        <img
                            src={BiomasaImage}
                            alt='Energía Eólica'
                            className='w-full md:w-1/5 rounded-lg mb-6 md:mb-0 md:mr-8'
                        />
                        {/* Texto */}
                        <div className='text-gray-800'>
                            <h3 className='text-3xl font-bold mb-4'>
                                Energía de la biomasa
                            </h3>
                            <p className='text-lg leading-relaxed'>
                                La biomasa es toda materia orgánica susceptible
                                de ser utilizada como fuente de energía, de ahí
                                que también sea como bioenergía. La biomasa
                                puede ser aprovechada de múltiples maneras. Por
                                ejemplo, gracias a un proceso de
                                biodegradadación producido por microorganismos
                                se puede llegar a obtener el biogás. Mediante el
                                uso de los llamados cultivos energéticos
                                (cultivos no destinados a la alimentación)
                                podemos también obtener los biocombustibles,
                                cuya principal característica es que son neutros
                                en carbono.
                            </p>
                        </div>
                    </div>
                    {/* Nueva Sección: Energía Eólica */}
                    <div className='flex flex-col md:flex-row items-center bg-[#EBF3E8] rounded-2xl p-8 shadow-lg shadow-[#A1D6B2]'>
                        {/* Imagen */}
                        <img
                            src={GeotermicaImage}
                            alt='Energía Eólica'
                            className='w-full md:w-1/5 rounded-lg mb-6 md:mb-0 md:mr-8'
                        />
                        {/* Texto */}
                        <div className='text-gray-800'>
                            <h3 className='text-3xl font-bold mb-4'>
                                Energía Geotermica
                            </h3>
                            <p className='text-lg leading-relaxed'>
                                La energía geotérmica surge del aprovechamiento
                                del calor procedente del interior de nuestro
                                planeta. Este recurso energético está presente
                                en cualquier geografía, pero solo se puede
                                aprovechar en localizaciones con unas
                                condiciones físicas concretas. En las
                                ubicaciones más favorables se manifiesta de
                                forma natural mediante fuentes termales,
                                géiseres o volcanes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sección de Estadísticas */}
                <div className='bg-gray-50 rounded-2xl p-8 shadow-lg mt-12'>
                    <h3 className='text-2xl font-bold mb-6 text-gray-800 text-center'>
                        ¿POR QUÉ SON IMPORTANTES LAS ENERGIAS RENOVABLES?
                    </h3>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <p className='text-lg font-bold text-yellow-500'>
                                Son respetuosas con el entorno
                            </p>
                            <p className='text-gray-600'>
                                Las energías renovables ayudan a reducir las
                                emisiones de gases de efecto invernadero,
                                contribuyen a cuidar el medio ambiente y frenar
                                el calentamiento global
                            </p>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <p className='text-lg font-bold text-yellow-500'>
                                Son inagotables
                            </p>
                            <p className='text-gray-600'>
                                Al producirse a partir de fuentes renovables, se
                                adaptan a los ciclos de la naturaleza y nunca se
                                agotan
                            </p>
                        </div>

                        <div className='bg-white p-4 rounded-lg shadow'>
                            <p className='text-lg font-bold text-yellow-500'>
                                Son autóctonas
                            </p>
                            <p className='text-gray-600'>
                                Las energías renovables se generan a partir de
                                fenómenos naturales, ayudando a reducir la
                                dependencia energética del exterior.
                            </p>
                        </div>
                        <div className='bg-white p-4 rounded-lg shadow'>
                            <p className='text-lg font-bold text-yellow-500'>
                                Están en constante evolución
                            </p>
                            <p className='text-gray-600'>
                                La constante innovación tecnológica permite que
                                la producción de energía renovable sea cada vez
                                más eficiente asequible para la población.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        // </div>
    );
};

export default Card;
