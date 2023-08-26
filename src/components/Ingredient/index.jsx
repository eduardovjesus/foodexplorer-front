import lettuce from '../../assets/alface.png';
import tomato from '../../assets/tomate.png';
import radish from '../../assets/rabanete.png';
import breadNaan from '../../assets/pao-naan.png';
import bread from '../../assets/pao.png';
import ham from '../../assets/presunto.png';
import arugula from '../../assets/rucula.png';
import shrimp from '../../assets/camarao.png';
import pasta from '../../assets/massa.png';
import pesto from '../../assets/pesto.png';
import cucumber from '../../assets/pepino.png';
import plum from '../../assets/ameixa.png';
import flour from '../../assets/farinha.png';
import peach from '../../assets/pessego.png';
import almonds from '../../assets/amendoas.png';
import egg from '../../assets/claras.png';
import damascus from '../../assets/damasco.png';
import passionFruit from '../../assets/maracuja.png';
import coffee from '../../assets/cafe.png';
import lowerLeg from '../../assets/canela.png';
import anise from '../../assets/aniz.png';
import lemon from '../../assets/limao.png';
import whiskey from '../../assets/whiskey.png';
import apple from '../../assets/maca.png';

import { Container } from './styles';

const images = {
  alface: lettuce,
  tomate: tomato,
  rabanete: radish,
  'pão naan': breadNaan,
  pão: bread,
  presunto: ham,
  rúcula: arugula,
  camarão: shrimp,
  massa: pasta,
  pesto: pesto,
  pepino: cucumber,
  ameixa: plum,
  farinha: flour,
  pêssego: peach,
  amêndoas: almonds,
  claras: egg,
  damasco: damascus,
  maracujá: passionFruit,
  café: coffee,
  canela: lowerLeg,
  aniz: anise,
  limão: lemon,
  whiskey: whiskey,
  maçã: apple,
};

export function Ingredient({ ingredient }) {
  let result = images[ingredient.toLowerCase().trim()] || damascus;

  return (
    <Container>
      <img src={result} alt="" />
      <span className="ingredient-name">{ingredient}</span>
    </Container>
  );
}
