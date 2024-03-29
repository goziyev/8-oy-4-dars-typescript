import React, { useState, useRef } from "react";
import style from "./index.module.css";
import FormDefault from "../../assets/formDefaultRadius.svg";
import earth from "../../assets/fluent_earth-32-regular.svg";
import instagram from "../../assets/ion_logo-instagram.svg";
import github from "../../assets/iconoir_github.svg";
import facebook from "../../assets/mingcute_facebook-line.svg";
import telegram from "../../assets/ic_baseline-telegram.svg";

const MyComponent: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string>(FormDefault);
  const [error, setError] = useState<string>(""); // Boshlang'ich qiymatni berish

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = () => {
    if (
      !inputRef.current ||
      !inputRef.current.files ||
      inputRef.current.files.length === 0
    ) {
      setError("Please select a file.");
      return;
    }
    const file = inputRef.current.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setSelectedImage(reader.result);
        setError("");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Salom");
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.formHeaderText}>
        <h2>Kompaniya ma’lumotlari</h2>
        <p>Kompaniya haqidagi ma’lumotlarni kiriting</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style.formImg}>
          <img src={selectedImage} width={84} height={84} alt="" />
          <label htmlFor="file-upload" className={style.uploadButton}>
            Yuklash
            <input
              id="file-upload"
              type="file"
              placeholder=" "
              ref={inputRef}
              onChange={handleFileChange}
            />
          </label>
          {error && <span style={{ color: "red" }}>{error}</span>}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="companyForm">
            Kompaniya nomi <span>*</span>
          </label>
          <input type="text" placeholder="Kompaniya nomi" />
          {/* <span>Iltimos maydonni to'ldiring...</span> */}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="companyForm">
            Email <span>*</span>
          </label>
          <input type="email" placeholder="Email" />
          {/* <span>Iltimos maydonni to'ldiring...</span> */}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="companyForm">
            Telefon raqami <span>*</span>
          </label>
          <input type="number" placeholder="UZ +9989" />
          {/* <span>Iltimos maydonni to'ldiring...</span> */}
        </div>
        <div className={style.formLinks}>
          <p>
            Linklar <span>*</span>
          </p>
          <div className={style.linksWrapper}>
            <div className={style.linksSmallCard}>
              <img src={earth} alt="Earth icon" />
            </div>
            <div className={style.linksSmallCard}>
              <img src={instagram} alt="instagram icon" />
            </div>
            <div className={style.linksSmallCard}>
              <img src={telegram} alt="telegram icon" />
            </div>
            <div className={style.linksSmallCard}>
              <img src={facebook} alt="facebook icon" />
            </div>
            <div className={style.linksSmallCard}>
              <img src={github} alt="Github icon" />
            </div>
          </div>
        </div>
        <div className={style.formCity}>
          <div className={style.formInputs}>
            <label htmlFor="companyForm">
              Davlat<span>*</span>
            </label>
            <select name="" id="companyForm">
              <option value="">Davlat</option>
              <option value="uzbekistan">UZ</option>
              <option value="kazakhstan">KG</option>
              <option value="russia">RU</option>
            </select>
            {/* <span>Iltimos maydonni to'ldiring...</span> */}
          </div>
          <div className={style.formInputs}>
            <label htmlFor="companyForm">
              Shahar<span>*</span>
            </label>
            <select name="" id="companyForm">
              <option value="">Shahar</option>
              <option value="uzbekistan">Toshkent</option>
              <option value="kazakhstan">Fergana</option>
              <option value="russia">Andijon</option>
            </select>
            {/* <span>Iltimos maydonni to'ldiring...</span> */}
          </div>
        </div>
        <div className={style.formInputs}>
          <label htmlFor="companyForm">
            Yashash joyi <span>*</span>
          </label>
          <input type="text" placeholder="Joy" />
          {/* <span>Iltimos maydonni to'ldiring...</span> */}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="hodimlar">
            Hodimlar soni<span>*</span>
          </label>
          <select id="hodimlar">
            <option value="">Hodimlar soni</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          {/* <span>Iltimos maydonni to'ldiring...</span> */}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="description">
            Izoh<span>*</span>
          </label>
          <textarea
            name="description"
            placeholder="Kompaniya haqida izoh qoldiring"
            rows={6}
          />
          {/* <span>Iltimos maydonni to'ldiring...</span> */}
        </div>
        <div className={style.formButtons}>
          <p>Ortga</p>
          <button>Keyingisi</button>
        </div>
      </form>
    </div>
  );
};

export default MyComponent;
