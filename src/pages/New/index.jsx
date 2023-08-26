import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronLeft, FiUpload } from "react-icons/fi";

import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { IngredientItem } from "../../components/IngredientItem";
import { useAuth } from "../../hooks/auth";
import { api } from "../../services/api";

import {
  Container,
  Content,
  ButtonBack,
  Form,
  SectionIngredients,
  InputWrapper,
} from "./styles";

export function New() {
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  function handleAddIngredient() {
    if (newIngredient.trim() !== "") { // Verifica se o novo ingrediente não está vazio após remover espaços em branco
      setIngredients((prevState) => [...prevState, newIngredient]);
      setNewIngredient("");
    }
  }
  

  function handleRemoveIngredient(deletedIngredient) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== deletedIngredient)
    );
  }
  

  async function handleNewDish() {
    const requiredFields = [
      { value: imageFile, message: "Adicione uma imagem para o prato" },
      { value: title, message: "Adicione um título para o prato" },
      { value: description, message: "Adicione uma descrição para o prato" },
      { value: category, message: "Adicione uma categoria para o prato" },
      { value: price, message: "Adicione um preço para o prato" },
    ];
  
    const missingField = requiredFields.find(({ value }) => !value);
    if (missingField) {
      return alert(missingField.message);
    }
  
    if (newIngredient.trim() !== "" && !ingredients.includes(newIngredient)) {
      return alert(
        "Você deixou um ingrediente no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio."
      );
    }
  
    if (ingredients.length < 1) {
      return alert("Adicione pelo menos um ingrediente");
    }
  
    setLoading(true);
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
  
    ingredients.forEach((ingredient) => formData.append("ingredients", ingredient));
  
    try {
      await api.post("/dishes", formData);
      alert("Prato cadastrado com sucesso");
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar o prato:", error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Container>
      <Header />
      {user.isAdmin && (
        <Content>
          <ButtonBack>
            <Link to="/">
              {" "}
              <FiChevronLeft size={30} />
              Voltar
            </Link>
          </ButtonBack>

          <Form>
            <header>
              <legend>Criar prato</legend>
            </header>

            <InputWrapper>
              <div className="smallBox">
                <label id="file" htmlFor="image">
                  Imagem do prato
                  <div>
                    <FiUpload size={24} />
                    <span>Selecione a imagem</span>
                    <input
                      id="image"
                      type="file"
                      onChange={(e) => {
                        setImageFile(e.target.files[0]);
                        setFileName(e.target.files[0].name);
                      }}
                    />
                  </div>
                  <span className="filename">{fileName}</span>
                </label>
              </div>
              <Input
                label="name"
                title="Nome do prato"
                type="text"
                placeholder="Ex.: Salada Ceasar"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div style={{display: "flex", flexDirection: "column"}}>
                <label htmlFor="category" style={{marginBottom: "0.8rem"}}>Categoria</label>
                <select
                  className="styled-select"
                  label="category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Selecione a Categoria</option>
                  <option value="pratos principais">pratos principais</option>
                  <option value="sobremesas">sobremesas</option>
                  <option value="bebidas">bebidas</option>
                </select>
              </div>
            </InputWrapper>

            <InputWrapper>
              <SectionIngredients>
                <span>Ingredientes</span>
                <div>
                  {ingredients.map((ingredient, index) => (
                    <IngredientItem
                      key={String(index)}
                      value={ingredient}
                      onClick={() => handleRemoveIngredient(ingredient)}
                    />
                  ))}
                  <IngredientItem
                    isNew
                    value={newIngredient}
                    placeholder="Adicionar"
                    onChange={(e) => setNewIngredient(e.target.value)}
                    onClick={handleAddIngredient}
                  />
                </div>
              </SectionIngredients>
              <div className="smallBox">
                <Input
                  label="price"
                  title="Preço"
                  type="text"
                  placeholder="R$ 00,00"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </InputWrapper>
            <Textarea
              label="Description"
              title="Descrição"
              placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="button" onClick={handleNewDish} disabled={loading}>
              {loading ? "Adicionando pedido" : "Adicionar pedido"}
            </button>
          </Form>
        </Content>
      )}
      <Footer />
    </Container>
  );
}
