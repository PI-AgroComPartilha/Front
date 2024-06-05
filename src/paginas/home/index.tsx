import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import Contato from "../../components/contato";

const data = [
  {
    id: "1",
    image:
      "https://ik.imagekit.io/mnz3yzqzot/view-woman-working-agricultural-sector-celebrate-labour-day-women_23-2151252083.jpg?updatedAt=1717514534423",
  },
  {
    id: "2",
    image:
      "https://ik.imagekit.io/mnz3yzqzot/elaine-casap-qgHGDbbSNm8-unsplash.jpg?updatedAt=1717436442052",
  },
  {
    id: "3",
    image:
      "https://ik.imagekit.io/mnz3yzqzot/woman-holding-basket-full-vegetables-with-copy-space%20(1).jpg?updatedAt=1717469115602",
  },
  {
    id: "4",
    image:
      "https://ik.imagekit.io/mnz3yzqzot/closeup-shot-person-picking-tomatoes-off-plant-farm.jpg?updatedAt=1717436820506",
  },
  {
    id: "5",
    image:
      "https://ik.imagekit.io/mnz3yzqzot/side-view-smiley-woman-outdoors%20(1).jpg?updatedAt=1717514694145",
  },
];
function Home() {
  return (
    <div>
      <div className="container">
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.image} alt="Slider" className="slide-item" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center font-medium">
        <h1 className="text-slate-900 text-5xl my-16">
          Quem somos nós
        </h1>
      </div>

      <div className="">
        <section className="flex justify-between my-16 pe-12 px-8  ">
          <p className="text-lg">
            Nosso projeto tem como objetivo conectar pequenos agricultores à
            população carente, visando juntos alcançarmos a meta de erradicar a
            fome e promover a agricultura sustentável. 
            
            Oferecemos aos agricultores cadastrados o suporte para práticas sustentáveis,
            oportunidades de expansão de mercado e redução do desperdício de
            alimentos. Enquanto isso, nossos clientes têm acesso a alimentos
            frescos a preços justos! 
            
            Além disso, comprometemo-nos a doar 30% dos
            valores arrecadados para ONGs parceiras que compartilham da mesma
            missão. 
            
            Junte-se a nós e ajude a construir um futuro mais
            sustentável e justo.
          </p>
          <div>
            <img
              className="max-w-72 ml-20"
              src="https://ik.imagekit.io/mnz3yzqzot/oie_transparent%20(6).png?updatedAt=1717471039191"
              alt="Imagem home"
            />
          </div>
        </section>
        <Contato />
      </div>
    </div>
  );
}

export default Home;
