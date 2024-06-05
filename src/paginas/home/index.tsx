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
      <div className="container mx-auto">
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
        <h1 className="text-slate-900 text-5xl my-16">Quem somos nós</h1>
      </div>

      <div className="">
        <section className="flex justify-between my-16 pe-12 px-8  ">
          <p className="text-lg">
            Somos uma iniciativa dedicada a conectar pequenos agricultores com a
            população carente, com a meta de erradicar a fome e promover a
            agricultura sustentável. Nossa plataforma oferece suporte para
            práticas agrícolas sustentáveis, oportunidades de mercado, e redução
            do desperdício de alimentos, beneficiando tanto agricultores quanto
            consumidores.
          </p>
          <h1 className="text-slate-900 text-5xl my-16">Nossa Missão</h1>
          <p className="text-lg">
            Nossa missão é proporcionar acesso a alimentos frescos a preços
            justos, ao mesmo tempo em que apoiamos os agricultores locais.
            Estamos comprometidos em criar um impacto positivo na sociedade,
            garantindo que 30% dos valores arrecadados sejam doados para ONGs
            parceiras que compartilham nosso objetivo de erradicar a fome.
            <h1 className="text-slate-900 text-5xl my-16">Nossos Valores</h1>
          </p>
          <p className="text-lg">
            Sustentabilidade: Promovemos práticas agrícolas que preservam o meio
            ambiente. Justiça Social: Garantimos que alimentos frescos sejam
            acessíveis a todos, especialmente à população carente. Comunidade:
            Fortalecemos a relação entre agricultores e consumidores,
            construindo uma rede de apoio mútuo. Transparência: Comprometemo-nos
            com a doação de parte dos nossos ganhos para organizações que
            trabalham pela mesma causa. Junte-se a nós e ajude a construir um
            futuro mais sustentável e justo para todos.
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
