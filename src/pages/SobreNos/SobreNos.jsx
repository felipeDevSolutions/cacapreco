// SobreNos.jsx
import React from 'react';
import './SobreNos.css';

// Importação das imagens dos desenvolvedores
import dev1 from '../../static/dev1.png';
import dev2 from '../../static/dev2.jpeg';
import dev3 from '../../static/dev3.jpeg';
import dev4 from '../../static/dev4.jpg';
import dev5 from '../../static/dev5.jpeg';


// Importação das imagens dos parceiros
import parceiro1 from '../../static/parceiro1.png';
import parceiro2 from '../../static/parceiro2.png';
import parceiro3 from '../../static/parceiro3.png';
import parceiro4 from '../../static/parceiro4.png';
import parceiro5 from '../../static/parceiro5.png';
import parceiro6 from '../../static/parceiro6.png';
import parceiro7 from '../../static/parceiro7.png';
import parceiro8 from '../../static/parceiro8.png';
import parceiro9 from '../../static/parceiro9.png';
import parceiro10 from '../../static/parceiro10.png';

// Importação dos ícones do LinkedIn e GitHub
import { FaLinkedin, FaGithub } from 'react-icons/fa';



const SobreNos = () => {
  const desenvolvedores = [

    {
      nome: 'Felipe Ramalho',
      foto: dev1,
      linkedin: 'https://www.linkedin.com/in/felipe-ramalho/', // URL do LinkedIn
      github: 'https://www.linkedin.com/in/felipercostadeveloper/', // URL do GitHub
    },
    {
      nome: 'Ricardo Vieira',
      foto: dev2,
      linkedin: 'https://www.linkedin.com/in/felipe-ramalho/', // URL do LinkedIn
      github: 'https://github.com/RicardoVCampos', // URL do GitHub
    },
    {
      nome: 'João Victor de Morais',
      foto: dev3,
      linkedin: 'https://www.linkedin.com/in/felipe-ramalho/', // URL do LinkedIn
      github: 'https://github.com/Jota-pro', // URL do GitHub
    },
    {
      nome: 'Ezequiel Cardoso',
      foto: dev4,
      linkedin: 'https://www.linkedin.com/in/felipe-ramalho/', // URL do LinkedIn
      github: 'https://github.com/eeezql', // URL do GitHub
    },
    {
      nome: 'José Vitor Ferreira',
      foto: dev5,
      linkedin: 'https://www.linkedin.com/in/felipe-ramalho/', // URL do LinkedIn
      github: 'https://github.com/vtr096', // URL do GitHub
    },
  ];

  const parceiros = [
    parceiro1, parceiro2, parceiro3, parceiro4, parceiro5,
    parceiro6, parceiro7, parceiro8, parceiro9, parceiro10,
  ];

  return (
    <div className="sobre-nos-container">

      <section className="section-sobre">
        <h2>Sobre o Caça-Preço</h2>
        <p>
          O Caça-Preço é uma plataforma online gratuita e inovadora projetada para ajudar você a economizar dinheiro em suas compras diárias. 
          Desenvolvido especificamente para moradores da Região Metropolitana de Fortaleza, centralizamos e comparamos preços de uma ampla variedade de produtos e serviços, 
          desde alimentos e combustíveis até medicamentos e serviços automotivos.
        </p>
        <p>
          Com uma interface intuitiva e fácil de usar, o Caça-Preço permite que você pesquise produtos, compare preços em diferentes estabelecimentos, 
          defina alertas de preços para ser notificado sobre promoções e crie listas de compras personalizadas. 
          Acreditamos que a informação é a chave para um consumo consciente e inteligente. 
          Por isso, oferecemos recursos como histórico de preços e uma comunidade ativa onde os usuários podem compartilhar dicas e ofertas, 
          promovendo a economia colaborativa e a sustentabilidade.
        </p>

        <p>
            Junte-se à comunidade Caça-Preço e comece a economizar hoje mesmo!
        </p>
      </section>

      <section className="section-desenvolvedores">
        <h2>Desenvolvedores</h2>
        <div className="desenvolvedores-container">
        {desenvolvedores.map((dev, index) => (
            <div className="desenvolvedor" key={index}>
            <img src={dev.foto} alt={dev.nome} className="dev-foto" />
            <h3>{dev.nome}</h3>
            <div className="dev-icons"> {/* Container para os ícones */}
                <a href={dev.linkedin} target="_blank" rel="noopener noreferrer"> {/* Ícone do LinkedIn */}
                <FaLinkedin className='dev-icon'/>
                </a>
                <a href={dev.github} target="_blank" rel="noopener noreferrer"> {/* Ícone do GitHub */}
                <FaGithub className='dev-icon'/>
                </a>
            </div>
            </div>
        ))}
        </div>
      </section>

      <section className="section-parceiros">
        <h2>Parceiros</h2>
        <div className="parceiros-logos">
          {parceiros.map((logo, index) => (
            <img src={logo} alt={`Parceiro ${index + 1}`} key={index} className="parceiro-logo" />
          ))}
        </div>
      </section>

    </div>
  );
};

export default SobreNos;