import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import Contato from "../../components/contato";

const data = [
  {
    id: "1",
    image:
      "https://ik.imagekit.io/pgmcw5jyhq/front-view-smiley-woman-holding-box.jpg?updatedAt=1717618543511",
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
    <div className="">
      <div className="w-full">
        <Swiper
          modules={[EffectFade]}
          effect="fade"
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: true }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
              <img src={item.image} alt="Slider" className="slide-item" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      <div className="">
        <section className="">


          <div className="">
            <h1 className="text-slate-900 text-5xl my-10 p-8">Quem somos nós</h1>
          </div>

          <div className="flex">

            <div className="space-x-52">
              <p className="text-lg text-justify p-8">
                Somos uma iniciativa dedicada a conectar pequenos agricultores com a
                população carente, com a meta de erradicar a fome e promover a
                agricultura sustentável. Nossa plataforma oferece suporte para
                práticas agrícolas sustentáveis, oportunidades de mercado, e redução
                do desperdício de alimentos, beneficiando tanto agricultores quanto
                consumidores.
              </p>
            </div>

            <div>
              <img
                className="ml-2 w-max"
                src="https://ik.imagekit.io/pgmcw5jyhq/AgroCompartilha.png?updatedAt=1717599123996"
                alt="Logo"
              />
            </div>

          </div>


          <div className="text-center">
            <p className="text-lg">
              <h1 className="text-slate-900 text-5xl my-16">Nossa Missão</h1>
              Nossa missão é proporcionar acesso a alimentos frescos a preços
              justos, ao mesmo tempo em que apoiamos os agricultores locais.
              Estamos comprometidos em criar um impacto positivo na sociedade,
              garantindo que 30% dos valores arrecadados sejam doados para ONGs
              parceiras que compartilham nosso objetivo de erradicar a fome.
            </p>
          </div>

          <div className="text-center">

            <h1 className="text-slate-900 text-5xl my-16 ">Nossos Valores</h1>

            <div className="flex">

              <div className="w-36 text-center">
                Sustentabilidade: Promovemos práticas agrícolas que preservam o meio ambiente.
              </div>
              <div className="w-36 text-center">
                Justiça Social: Garantimos que alimentos frescos sejam acessíveis a todos, especialmente à população carente.
              </div>
              <div className="w-36 text-center">
                Comunidade: Fortalecemos a relação entre agricultores e consumidores, construindo uma rede de apoio mútuo.
              </div>
              <div className="w-36 text-center">
                Transparência: Comprometemo-nos com a doação de parte dos nossos ganhos para organizações que trabalham pela mesma causa.
              </div>

            </div>

            <div className="">
              Junte-se a nós e ajude a construir um futuro mais sustentável e justo para todos.
            </div>

          </div>



        </section>
        <Contato />
      </div>
    </div>
  );
}

export default Home;
