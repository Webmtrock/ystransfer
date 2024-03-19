import Carousel from "better-react-carousel";
import React from "react";

const Customers = () => {
  const data = [
    ,
    {
      id: 1,
      src:"https://player.vimeo.com/video/681985935?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img: "/assets/images/customer1.png",
      name: "Ramchandra Rao | Father of ASD child",
      text: "Father of a 2.5-year-old boy with Autism Spectrum Disorder (ASD) shared uplifting testimonials about his child's progress. He noted improvements in bowel movements, a considerable decrease in hand flapping, and a significant reduction in hyperactivity.",
    },
    {
      id: 2,
      src:"https://player.vimeo.com/video/681986636?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img: "/assets/images/customer1.png",
      name: "Pradeep Kumar Nayak | Father of ASD child",
      text: "Father of a 2.8-year-old girl with Autism Spectrum Disorder (ASD) expressed satisfaction with our interventions. He observed enhanced social interactions, improved eye contact, and an overall increase in the child's energy levels.",
    },
    {
      id: 3,
      src:"https://player.vimeo.com/video/681954611?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img: "/assets/images/customer1.png",
      name: "Dhruva Kapur | Father of ASD/ ADHD child",
      text: "Father of a 4.5-year-old boy with ADHD/ASD underscore the effectiveness of our interventions. He noted improvements in digestion, enhanced response, and better control over hyperactivity in his son.",
    },
    {
      id: 4,
      src:"https://player.vimeo.com/video/681992332?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      img: "/assets/images/customer1.png",
      name: "Priyanka Srivastava | Mother of ASD child",
      text: "Mother of a 2.1-year-old girl with Autism Spectrum Disorder (ASD) shared her daughter’s journey, citing improved digestion health, enhanced imitation skills, better command following, and the initiation of communication.",
    },
    {
      id: 5,
      src:"https://www.youtube.com/embed/ntZSdi76oFM",
      img: "/assets/images/customer1.png",
      name: "Mrs. Pooja",
      text: "This video covers the transformation story of Pooja suffering from Type 1 Diabetes. She lost all her hope that she can cure her type 1 diabetes. After having this Ultimate Diabesity Lifestyle Program, she followed all diet plans.",
    },
    {
      id: 6,
      src:"https://www.youtube.com/embed/rtQIK9re2mc",
      img: "/assets/images/customer2.png",
      name: "Mrs. Manvinder",
      text: "In this video, we have covered the success story of manvinder, she was suffering from high blood sugar. After joining this Diabesity Lifestyle Progam, she felt a lot of improvement in her hair and skin and reduced her sugar level to normal.",
    },
    {
      id: 7,
      src:"https://www.youtube.com/embed/PQlUcIIoGNQ",
      img: "/assets/images/customer1.png",
      name: "Mr. Joy Panda",
      text: "In this video, we have covered the successful story of our participants in the Ultimate Diabesity Lifestyle Program. Watch the complete video, how this program is going to improve your health.",
    },
    ,
    {
      id: 8,
      src:"https://www.youtube.com/embed/8VOMehE2rpY",
      img: "/assets/images/customer1.png",
      name: "Mr. Pramod",
      text: "n this video, we have covered the successful story of our participants in the Ultimate LCHF Lifestyle Program. Watch the complete video, how this program is going to improve your health.",
    },
    ,
    {
      id: 9,
      src:"https://www.youtube.com/embed/pJJKe0jcQzA",
      img: "/assets/images/customer1.png",
      name: "Mrs. Nidhi Jain",
      text: "Kumbhak helps you to cure your chronic diseases like bp, diabetes, thyroid & other hormonal issues as well, it will heal you internally and naturally or make your organs stronger to heal by themself.",
    },
    {
      id: 10,
      src:"https://www.youtube.com/embed/PQlUcIIoGNQ",
      img: "/assets/images/customer1.png",
      name: "Mr. Hemant kumar",
      text: "Kumbhak Therapy helps in enhancing the functional strength of the system or the immunity. This video showcase Mr. Hemant Kumar who shares his Heart & BP Care Program Experience. Hemant Kumar used to be a victim of blood pressure & low energy levels.",
    }
  ];

  
  return (
    <>
      <div className='container pt-10 md:py-10'>
        <div className='pt-5'>
          <div className='text-center md:text-2xl   text-black font-semibold'>
            <span className='border-b-2 border-yellow-500 '>HEAR FROM OUR</span>{" "}
            CUSTOMERS
          </div>
          <div className="pt-10">
            <Carousel cols={4} rows={1} gap={20}>
              {data.map((item, ind) => {
                return (
                   <Carousel.Item>
                      <div className='text-center bg-white border h-[460px] px-[8px] py-[7px] rounded-lg  col-span-12 md:col-span-4 space-y-3'>
                       <iframe allowFullScreen={true} className="rounded-3xl shadow-lg p-2 w-full h-[200px]" src={item.src}/>
                        <div>{item.name}</div>
                        <p className='text-sm  md:full'>{item.text}</p>
                      </div>
                    </Carousel.Item>  
                );
              })}
            </Carousel>  
          </div>
          </div>
        </div>
    </>
  );
};

export default Customers;
