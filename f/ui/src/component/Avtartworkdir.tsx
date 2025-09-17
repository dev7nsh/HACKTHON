import { AvatarGroup } from "../component/Avtargroup"

import React from 'react'

const Avtartworkdir = () => {
  return (
    
    <>
    <AvatarGroup
                avatars={[
                {
                    src: "https://i.ibb.co/DD9ZfQZF/1756984543150.png",
                    label: "Devansh",
                    link: "https://www.linkedin.com/in/devanshchouhan/"
                },
                {
                    src: "https://i.ibb.co/QjCH0x3S/1757129400748.jpg",
                    label: "Pushpender",
                    link: "https://www.linkedin.com/in/pushpendra-saini-/"
                }, 
                { src: "./girl.jpg", label:"Bhumika", link: "https://www.linkedin.com/in/bhumika-jangid-b9162b35b/" },
                { src: "./girl.jpg", label: "Riza" , link: "" },
                {
                    src: "https://i.ibb.co/6cWhfdJF/1723951600320.jpg",
                    label: "Abhishek",
                    link: "https://www.linkedin.com/in/abhishek-khemani-832749319/"
                },
                { src: "https://i.ibb.co/JWz9jvY0/1735137537242.jpg", label: "Lakshya",
                  link: "https://www.linkedin.com/in/lakshya-439075271/"
                 },
               
                ]}
                maxVisible={6}
                size={60}
            />
    </>
  )
}

export default Avtartworkdir;
