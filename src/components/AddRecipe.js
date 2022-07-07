import React, { useState } from "react";
import icons from "../img/icons.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { uploadRecipe } from "../api/fetching";

const FormSchema = yup.object().shape(
  {}
  //   {
  //   title: yup.string().required(),
  //   sourceUrl: yup.string().url().required(),
  //   image: yup.string().url().required(),
  //   publisher: yup.string().required(),
  //   cookingTime: yup.number().required(),
  //   servings: yup.number().required(),
  // }
);
const AddRecipe = ({ isOpen, onToggle }) => {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(FormSchema) });

  const onSubmit = (data) => {
    const ingredients = Object.entries(data)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArr = ing[1].split(",").map((el) => el.trim());
        if (ingArr.length !== 3) throw new Error("Wrong Ingredient Format");
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };
    console.log("recipe", recipe);
    uploadRecipe(recipe);
  };

  // const handleClick = () =>
  //   reset({
  //     title: "",
  //     sourceUrl: "",
  //     image: "",
  //     publisher: "",
  //     cookingTime: "",
  //     servings: "",
  //     "ingredient-1": "",
  //     "ingredient-2": "",
  //     "ingredient-3": "",
  //     "ingredient-4": "",
  //     "ingredient-5": "",
  //     "ingredient-6": "",
  //   });

  return (
    <div>
      <div className={`overlay ${isOpen ? "" : "hidden"} `}></div>
      <div className={`add-recipe-window ${isOpen ? "" : "hidden"} `}>
        <button onClick={onToggle} className="btn--close-modal">
          &times;
        </button>
        <form className="upload" onSubmit={handleSubmit(onSubmit)}>
          <div className="upload__column">
            <h3 className="upload__heading">Recipe data</h3>
            <label>Title</label>
            <input
              defaultValue="TEST233"
              name="title"
              type="text"
              {...register("title")}
            />
            {errors.title && <p className="pform">{errors.title.message}</p>}
            <label>URL</label>
            <input
              defaultValue="TEST233"
              name="sourceUrl"
              type="text"
              {...register("sourceUrl")}
            />
            {errors.sourceUrl && (
              <p className="pform">{errors.sourceUrl.message}</p>
            )}
            <label>Image URL</label>
            <input
              defaultValue="TEST233"
              name="image"
              type="text"
              {...register("image")}
            />
            {errors.image && <p className="pform">{errors.image.message}</p>}
            <label>Publisher</label>
            <input
              defaultValue="TEST233"
              name="publisher"
              type="text"
              {...register("publisher")}
            />
            {errors.publisher && (
              <p className="pform">{errors.publisher.message}</p>
            )}
            <label>Prep time</label>
            <input
              {...register("cookingTime")}
              defaultValue="23"
              name="cookingTime"
              type="number"
            />
            {errors.cookingTime && (
              <p className="pform">{errors.cookingTime.message}</p>
            )}

            <label>Servings</label>
            <input
              defaultValue="23"
              name="servings"
              type="number"
              {...register("servings")}
            />
            {errors.servings && (
              <p className="pform">{errors.servings.message}</p>
            )}
          </div>

          <div className="upload__column">
            <h3 className="upload__heading">Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              // defaultValue="0.5,kg,Rice"
              // type="text"
              // required
              // name="ingredient-1"
              // placeholder="Format: 'Quantity,Unit,Description'"
              {...register("ingredient-1")}
            />
            <label>Ingredient 2</label>
            <input
              // defaultValue="1,,Avocado"
              // type="text"
              // name="ingredient-2"
              // placeholder="Format: 'Quantity,Unit,Description'"
              {...register("ingredient-2")}
            />
            <label>Ingredient 3</label>
            <input
              // defaultValue=",,salt"
              // type="text"
              // name="ingredient-3"
              // placeholder="Format: 'Quantity,Unit,Description'"
              {...register("ingredient-3")}
            />
            <label>Ingredient 4</label>
            <input
              // type="text"
              // name="ingredient-4"
              // placeholder="Format: 'Quantity,Unit,Description'"
              {...register("ingredient-4")}
            />
            <label>Ingredient 5</label>
            <input
              // type="text"
              // name="ingredient-5"
              // placeholder="Format: 'Quantity,Unit,Description'"
              {...register("ingredient-5")}
            />
            <label>Ingredient 6</label>
            <input
              // type="text"
              // name="ingredient-6"
              // placeholder="Format: 'Quantity,Unit,Description'"
              {...register("ingredient-6")}
            />
          </div>
          {/* <input type="submit" /> */}
          <button className="btn upload__btn" type="submit">
            <svg>
              <use href={icons + "#icon-upload-cloud"}></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
