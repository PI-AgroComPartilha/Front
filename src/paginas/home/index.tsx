import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { Helmet } from "react-helmet";

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
    <>
      <Helmet>
        <title>Agrocompartilha</title>
      </Helmet>
      <div className="flex flex-col gap-4">
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
          <section className="w-full flex flex-col gap-16">
            <div className="flex  flex-col mx-auto w-full">
              <div className="flex mx-auto">
                <div className="spa">
                  <h2 className="text-slate-900 text-5xl  p-6">Sobre nós</h2>
                  <p className="text-lg text-justify p-6 w-full max-w-[700px] mx-auto">
                    Somos uma iniciativa dedicada a conectar pequenos agricultores
                    com a população carente, com a meta de erradicar a fome e
                    promover a agricultura sustentável. Nossa plataforma oferece
                    suporte para práticas agrícolas sustentáveis, oportunidades de
                    mercado, e redução do desperdício de alimentos, beneficiando
                    tanto agricultores quanto consumidores.
                  </p>
                </div>
                <img
                  className="w-[300px] h-[300px] "
                  src="https://ik.imagekit.io/pgmcw5jyhq/AGROCOMPARTILHA%20(2).png?updatedAt=1717620650653"
                  alt="Logo"
                />
              </div>
            </div>

            {/* Seção Nossa Missão */}
            <div className="flex  flex-col mx-auto w-full">
              <div className="flex mx-auto">
                <img
                  className="w-[300px] h-[300px] "
                  src="https://ik.imagekit.io/pgmcw5jyhq/AgroCompartilha%20(3).png?updatedAt=1717682487142"
                  alt="foto-missao"
                />
                <div className="spa">
                  <h2 className="text-slate-900 text-5xl  p-6 text-right">
                    Missão
                  </h2>
                  <p className="text-lg text-justify p-6 w-full max-w-[700px] mx-auto ">
                    Nossa missão é proporcionar acesso a alimentos frescos a
                    preços justos, ao mesmo tempo em que apoiamos os agricultores
                    locais. Estamos comprometidos em criar um impacto positivo na
                    sociedade, garantindo que 30% dos valores arrecadados sejam
                    doados para ONGs parceiras que compartilham nosso objetivo de
                    erradicar a fome.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h1 className="text-slate-900 text-5xl my-12 mt">Valores</h1>

              <div className="flex justify-center gap-5 w-full">
                <div className="max-w-44 w-full text-center border-solid border-2 border-b-emerald-500 rounded">
                  <img
                    className="justify-center p-7"
                    src="https://ik.imagekit.io/pgmcw5jyhq/pngtree-sustainability-line-icon-png-image_9012715.png?updatedAt=1717622298324"
                    alt="sustentabilidade"
                  />
                  <p className="font-bold mb-2">Sustentabilidade</p>
                  <p className="p-1">
                    Promovemos práticas agrícolas que preservam o meio ambiente.
                  </p>
                </div>

                <div className="w-44 text-center border-solid border-2 border-b-emerald-500 rounded">
                  <img
                    className="justify-center p-7"
                    src="https://ik.imagekit.io/pgmcw5jyhq/5966163.png?updatedAt=1717622284261"
                    alt="justiça-social"
                  />
                  <p className="font-bold mb-2">Justiça Social</p>
                  <p className="p-1">
                    Garantimos que alimentos frescos sejam acessíveis a todos,
                    especialmente à população carente.
                  </p>
                </div>

                <div className="w-44 text-center border-solid border-2 border-b-emerald-500 rounded">
                  <img
                    className="justify-center p-7"
                    src="https://ik.imagekit.io/pgmcw5jyhq/people_community_filled_icon_201297.png?updatedAt=1717622273103"
                    alt="comunidade"
                  />
                  <p className="font-bold mb-2">Comunidade</p>
                  <p className="p-1">
                    Fortalecemos a relação entre agricultores e consumidores,
                    construindo uma rede de apoio mútuo.
                  </p>
                </div>

                <div className="w-44 text-center border-solid border-2 border-b-emerald-500 rounded">
                  <img
                    className="justify-center p-7"
                    src="https://ik.imagekit.io/pgmcw5jyhq/1355174.png?updatedAt=1717622260919"
                    alt="transparencia"
                  />
                  <p className="font-bold mb-2">Transparência</p>
                  <p className="p-0.5">
                    Comprometemo-nos com a doação de parte dos nossos ganhos para
                    organizações que trabalham pela mesma causa.
                  </p>
                </div>
              </div>

              <div className="p-8 ">
                <h3 className="text-slate-900 text-xl font-semibold">
                  Junte-se a nós e ajude a construir um futuro mais sustentável e
                  justo para todos!{" "}
                </h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
