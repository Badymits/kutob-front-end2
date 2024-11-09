import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';

import taumbayan_all from '../assets/Taumbayan_All.png'
import mangangaso from '../assets/Mangangaso.png'
import babaylan from '../assets/Babaylan.png'
import manghuhula from '../assets/Manghuhula.png'
import mandurugo from '../assets/Mandurugo.png'
import manananggal from '../assets/Manananggal.png'
import berbalang from '../assets/Berbalang.png'

import { PiBookOpenFill } from "react-icons/pi";
import { IoMdClose } from 'react-icons/io';
import { Tooltip } from 'react-tooltip'

import 'swiper/css';
import 'swiper/css/effect-cards';


const TaumbayanText = `The only role of the Taumbayan is to find out who the Aswang is among all the other players in the discussion phase.`


const MangangasoText = `The Mangangaso chooses someone to protect or they can also choose themself. 
if the Mangangaso protected the one whom the Aswang chose to kill, they would be saved. After a certain amount of time, they can choose to eliminate an aswang and
hopefully not an innocent villager...`
const MangangasoBibliography = `"Mangangaso" is a Tagalog word that means "hunter." It comes from the root word "aso" (dog) combined with the prefix 
"mang-" and initial reduplication. The construction follows a common pattern in Tagalog for deriving words related to occupations or habitual actions. 
Specifically, "mangangaso" refers to a person skilled in hunting animals, typically in forests or mountains, using weapons like guns, bows and arrows, 
or spears. In a strict sense, it denotes a hunter who uses dogs, but the word is also used more broadly to refer to hunters in general` 

const BabaylanText = `The Babaylan can select anyone they’d like to keep alive, hopefully not wasting their ability on an Aswang. 
They can also choose themself to save. The person chosen will survive if the Aswang chooses the same player to kill.`

const BabaylanBibliography = `"Babaylan" is a term that refers to shamans or spiritual leaders in pre-colonial Philippine society. 
The origin of the word can be traced to Proto-Western-Malayo-Polynesian *balian, meaning "shaman". The babaylan tradition represents an 
indigenous form of spiritual leadership and healing that was deeply ingrained in pre-colonial Filipino culture. While the Spanish colonization 
and the introduction of Christianity significantly impacted this tradition, aspects of it have survived and continue to influence Filipino 
spirituality and cultural practices today.`


const ManghuhulaText = `The Manghuhula chooses a player whom they think might be the Aswang. There will be a confirmation 
whether their “Hula” is correct by a thumbs up and wrong by a thumbs down. Whatever results they may attain, 
it is their duty to convince the other players with the information they have.`

const ManghuhulaBibliography = `"Manghuhula" is a Tagalog word that generally refers to a fortune teller, soothsayer, or someone who practices divination. 
The word comes from the root "hula" which means "guess" or "prediction". Fortune telling and divination have a long history in Filipino culture, 
with practices like these being part of pre-colonial traditions`


const MandurugoText = `The Mandurugo is the Strongest Aswang there is. They can kill any player whether they have the protection or not. 
They can also be saved by the Babaylan and protected by the Mangangaso if they can keep their identity hidden.`

const MandurugoBibliography = `The Mandurugo is a part of vampire folklore that began in the Philippines.

The "Mandurugo" is referred to as a Kinnara or Kinnari in pre-colonial Philippines; they are lovely, peaceful beings that resemble slender youngsters. Oral tradition holds that the Kinari, named Mandurugo by the Spanish missionaries imposing Roman Catholicism throughout the archipelago, will turn into a bloodsucking monster when a human breaks its heart. Until then, the Kinari will love and serve devotedly, according to this belief.

Reference: https://stoicaswang.wordpress.com/2012/04/09/the-mandurugo-2/
`


const ManananggalText = `The Manananggal is the second strongest Aswang. It cannot kill a protected player. However, if they do so choose one, 
the Mangangaso won’t be able to protect anyone the next night.`

const ManananggalBibliography = `A Filipino Aswang (bad spirit) known as the Manananggal ("self-segmenter") separates her torso from her lower half and then soars through the night to devour babies.

The term "tanggal" in Filipino, which means "to separate," was used to describe this monster because the manananggal could split itself off from its lower body.

Manananggal selects a secluded area to leave her lower body while she searches at night in order to feed. She has the power to fly when she splits from her lower torso. After that, she sets out to find homes for expectant mothers. The Manananggal lands on the house and puts her tongue through the ceiling after selecting a suitable victim. The tongue is hollow, lengthy, and incredibly pliable. She uses it to pierce the sleeping woman's womb and extract the fetus. Other times, she uses her beauty to entice men, luring them to a private area where she devours them alive. She typically consumes organs like the liver, stomach, and heart.

Reference: https://mythus.fandom.com/wiki/Manananggal
`


const BerbalangText = `The Berbalang is one of the three Aswangs in the game. They are the lowest kind of Aswang and their role is to only 
kill unprotected players.`

const BerbalangBibliography = `In Filipino mythology, there exist beings known as Berbalangs. 
They look human, yet their wings and slanted eyes give them vampire-like characteristics. T
hey excavate graves in order to consume bodies

Reference: https://multoghost.wordpress.com/2016/01/27/the-berbalangs-a-legend-of-filipino-ghouls/
`


const RoleDescriptions = () => {
    const image = useRef(taumbayan_all)
    const bibliography = useRef(null)
    const [ characterDescription, setCharacterDescription ] = useState(false)
    const [roleDescription, setRoleDescription] = useState()

    const roleDescriptionSwitch = () => {
        switch (roleDescription){
            case 1:
                image.current = mangangaso
                bibliography.current = MangangasoBibliography
                return MangangasoText
            case 2:
                image.current = babaylan
                bibliography.current = BabaylanBibliography
                return BabaylanText
            case 3:
                image.current = manghuhula
                bibliography.current = ManghuhulaBibliography
                return ManghuhulaText
            case 4:
                image.current = berbalang
                bibliography.current = BerbalangBibliography
                return BerbalangText
            case 5:
                image.current = manananggal
                bibliography.current = ManananggalBibliography
                return ManananggalText
            case 6:
                image.current = mandurugo
                bibliography.current = MandurugoBibliography
                return MandurugoText
            default:
                image.current = taumbayan_all
                return TaumbayanText
        }
    }

  return (
    <div className={`h-screen ${ roleDescription >= 4 ? 'bg-night-bg' : 'bg-day-bg'}  bg-center bg-cover duration-700 ease-in-out relative p-[4em] bg-no-repeat `}>
        <div className=" bg-white/10 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center 
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[95%] md:px-[120px] md:overflow-auto">

            <div className='absolute top-5 z-50'>    
                
                <h1 className=" text-5xl md:text-6xl font-metaltext text-center">Roles</h1>
                <p className='font-metaltext text-center py-1 md:py-6 lg:py-2  text-base md:text-xl'>swipe left  or right to navigate</p>

                <div className='flex items-center pb-[40px]'>
                    <p>Click to see Bibliography</p>
                    <PiBookOpenFill data-tooltip-id="my-tooltip" data-tooltip-content="Bibliography" className=' text-4xl cursor-pointer m-3 hover:text-red-400' onClick={() => setCharacterDescription(!characterDescription)}/>
                    <Tooltip id="my-tooltip" />
                </div>
                
            </div>
            <div className={`${characterDescription ? 'font-metaltext rounded-xl text-center absolute h-[75%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[1px] border-black w-full md:w-[70%] md:px-[120px] overflow-auto px-2 bg-[#463622] z-50 over py-3' : 'hidden'}`}>
                <IoMdClose onClick={() => setCharacterDescription(!characterDescription)} className="cursor-pointer text-5xl absolute right-1 m-4"/>
                <img src={image.current} alt="" className='h-[180px] w-[120px] md:h-[270px] md:w-[180px] mx-auto mb-4'/>
                <p className=' text-lg md:text-2xl leading-8 md:leading-[60px]'>{bibliography.current}</p>
            </div>
            
            <div className='grid grid-flow-row lg:grid-flow-col items-center justify-center  w-full font-metaltext py-5 mt-24 md:mt-[5em]'>

                <div className='order-last lg:order-first duration-300 ease-in-out mt-[30px] md:mt-[100px] max-w-[700px] lg:mt-0 text-left  lg:mr-[1em] px-4  md:static'>
                    <p className='text-2xl md:text-3xl  lg:text-4xl'>{roleDescriptionSwitch()}</p>
                </div>

                <div className='mt-[5em] md:mt-[12em] lg:mt-0 lg:ml-7 lg:pb-[2em]'>
                
                    <Swiper
                                    
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="h-[180px] w-[120px] sm:h-[280px] sm:w-[190px] md:h-[330px] md:w-[220px] lg:h-[410px] lg:w-[270px] "
                        onActiveIndexChange={(swiper) => setRoleDescription(swiper.activeIndex)}
                    >
                        
                        <SwiperSlide className=' '>  
                            <img src={taumbayan_all} alt="" className='h-full w-full' />
                        </SwiperSlide>

                        <SwiperSlide className=' '>   
                            <img src={mangangaso} alt="" className='h-full w-full' />
                        </SwiperSlide>

                        <SwiperSlide className=' '>                    
                            <img src={babaylan} alt="" className='h-full w-full' />
                        </SwiperSlide>

                        <SwiperSlide className=''>              
                            <img src={manghuhula} alt="" className='h-full w-full' />
                        </SwiperSlide>
                        <SwiperSlide className=''>              
                            <img src={berbalang} alt="" className='h-full w-full' />
                        </SwiperSlide>
                        <SwiperSlide className=''>              
                            <img src={manananggal} alt="" className='h-full w-full' />
                        </SwiperSlide>
                        <SwiperSlide className=''>              
                            <img src={mandurugo} alt="" className='h-full w-full' />
                        </SwiperSlide>
                        
                        
                    </Swiper>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default RoleDescriptions