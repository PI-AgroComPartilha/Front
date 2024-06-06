import { Envelope, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ContatoProps {}

type pessoa = {
  foto: string;
  nome: string;
  email: string;
  linkedIn: string;
  github: string;
};

const pessoas: pessoa[] = [
  {
    foto: "https://ik.imagekit.io/5dvf5jkhq/IMG_9651.jpeg?updatedAt=1717528484431",
    nome: "Jennifer Fernandes",
    email: "mailto:jennyfer.fernandes716@gmail.com",
    linkedIn: "https://www.linkedin.com/in/jennifer-fernandes25",
    github: "https://github.com/jennizs",
  },
  {
    foto: "https://ik.imagekit.io/5dvf5jkhq/Bruna.jpg?updatedAt=1717528488049",
    nome: "Bruna Teles",
    email: "mailto:bru_tls@hotmail.com",
    linkedIn: "https://www.linkedin.com/in/brunateles",
    github: "https://github.com/bru-tls",
  },
  {
    foto: "https://ik.imagekit.io/5dvf5jkhq/Vitor.jpg?updatedAt=1717528488129",
    nome: "Vitor Oliveira",
    email: "mailto:caulicons.jobs@gmail.com",
    linkedIn: "https://www.linkedin.com/in/caulicons",
    github: "https://github.com/caulicons",
  },
  {
    foto: "https://ik.imagekit.io/5dvf5jkhq/Caue.jpg?updatedAt=1717528487176",
    nome: "Cauê Souza",
    email: "mailto:caue.souzapl@gmail.com",
    linkedIn: "https://www.linkedin.com/in/cauesooouza",
    github: "https://github.com/cauesooouza",
  },
  {
    foto: "https://ik.imagekit.io/5dvf5jkhq/Dhessyca.jpg?updatedAt=1717528489892",
    nome: "Dhessyca Souza",
    email: "mailto:dhessyca.pessoal@gmail.com",
    linkedIn: "https://www.linkedin.com/in/dhessyca-s",
    github: "https://github.com/Dhessyca01",
  },
  {
    foto: "https://ik.imagekit.io/mnz3yzqzot/Pedro.jpg?updatedAt=1717611781219",
    nome: "Pedro Almeida",
    email: "mailto:almeida.pedroaugusto25@gmail.com",
    linkedIn: "https://www.linkedin.com/in/pedroaugustosantosalmeida",
    github: "https://github.com/PedroAlmeida25",
  },
  {
    foto: "https://ik.imagekit.io/mnz3yzqzot/Dani.jpg?updatedAt=1717611767735",
    nome: "Daniele Furtado",
    email: "mailto:danicfurtado@outlook.com",
    linkedIn: "https://www.linkedin.com/in/danielefurtado",
    github: "https://github.com/dani-furtado",
  },
  {
    foto: "https://ik.imagekit.io/mnz3yzqzot/DSCF0175.jpg?updatedAt=1717610748176",
    nome: "Thais Siqueira",
    email: "mailto:",
    linkedIn: "https://www.linkedin.com/in/thaisqusi",
    github: "https://github.com/Thaisraie",
  },
];

const Contato: FC<ContatoProps> = () => {
  return (
    <section className="w-full">
      <h1 className="flex text- justify-center ">
        <div className="flex justify-between py-6 mx-auto items-center container px-4">
          <div className="font-medium text-3xl flex items-center gap-1">
            Conheça o time de desenvolvedores:
          </div>
        </div>
      </h1>

      <div className="flex w-full justify-center flex-wrap  mx-auto gap-6  ">
        {pessoas.map((pessoa, id) => (
          <CardPessoa key={id} {...pessoa} />
        ))}
      </div>
    </section>
  );
};

const CardPessoa = ({ nome, email, linkedIn, github, foto }: pessoa) => {
  return (
    <div className="flex flex-col w-full justify-center items-center text-center max-w-[300px] gap-4">
      <img
        src={foto}
        className="h-40 rounded-full  w-[160px] object-cover object-top border-4  border-green-700"
        alt=""
      />
      <p className="font-bold uppercase text-base">{nome}</p>
      <div className="flex w-full justify-center gap-2	font-extrabold ">
        <Link to={`${email}`} target="_blank">
          <Envelope size={32} />
        </Link>
        <Link to={`${linkedIn}`} target="_blank">
          <LinkedinLogo size={32} />
        </Link>
        <Link to={`${github}`} target="_blank">
          <GithubLogo size={32} />
        </Link>
      </div>
    </div>
  );
};
export default Contato;
