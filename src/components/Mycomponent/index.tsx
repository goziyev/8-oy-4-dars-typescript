import React, { useState } from "react";
import style from "./index.module.css";
import FormDefault from "../../assets/formDefaultRadius.svg";
import earth from "../../assets/fluent_earth-32-regular.svg";
import instagram from "../../assets/ion_logo-instagram.svg";
import github from "../../assets/iconoir_github.svg";
import facebook from "../../assets/mingcute_facebook-line.svg";
import telegram from "../../assets/ic_baseline-telegram.svg";

const MyComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    selectedImage: FormDefault,
    company: "",
    email: "",
    phoneNumber: "",
    city: "",
    livingPlace: "",
    employeeCount: "",
    description: "",
    country: "", // Country qatorini qo'shamiz
  });

  const [errors, setErrors] = useState({
    company: "",
    email: "",
    phoneNumber: "",
    city: "",
    livingPlace: "",
    employeeCount: "",
    description: "",
    country: "", // Country xususiyatini qo'shamiz
    selectedImage:""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormData((prevData) => ({
            ...prevData,
            selectedImage: reader.result as string,
            country: prevData.country, // Country xususiyatini saqlash
          }));
          // Rasm formatini tekshirish
          const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
          if (!allowedExtensions.exec(file.name)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              selectedImage:
                "Faqat JPG, JPEG yoki PNG formatidagi rasmni yuklash mumkin.",
            }));
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              selectedImage: "",
            }));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Xato xabarlarni qaytarish uchun tekshirish
    if (name === "company" && value.trim() === "") {
      setErrors({ ...errors, company: "Kompaniya nomini kiriting." });
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, email: "Email manzili noto'g'ri." });
    } else if (name === "phoneNumber" && !/^\+?\d{9,14}$/.test(value)) {
      setErrors({
        ...errors,
        phoneNumber: "Telefon raqamini to'g'ri kiriting.",
      });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.selectedImage === FormDefault || !formData.selectedImage) {
      setErrors({
        ...errors,
        selectedImage: "Rasm tanlanmagan. Iltimos, rasm yuklang.",
      });
      return;
    }
    // Validatsiya
    const {
      company,
      email,
      phoneNumber,
      city,
      livingPlace,
      employeeCount,
      description,
    } = formData;
    if (company.trim() === "") {
      setErrors({ ...errors, company: "Kompaniya nomini kiriting." });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ ...errors, email: "Email manzili noto'g'ri." });
    } else if (!/^\+?\d{9,14}$/.test(phoneNumber)) {
      setErrors({
        ...errors,
        phoneNumber: "Telefon raqamini to'g'ri kiriting.",
      });
    } else if (city === "") {
      setErrors({ ...errors, city: "Shaharni tanlang." });
    } else if (livingPlace.trim() === "") {
      setErrors({ ...errors, livingPlace: "Yashash joyini kiriting." });
    } else if (employeeCount === "") {
      setErrors({ ...errors, employeeCount: "Hodimlar sonini tanlang." });
    } else if (description.trim() === "") {
      setErrors({ ...errors, description: "Izohni kiriting." });
    } else {
      // Formani yuborish
      alert("Form submitted successfully!");
    }
  };

  return (
    <div className={style.formWrapper}>
      <div className={style.formHeaderText}>
        <h2>Kompaniya ma’lumotlari</h2>
        <p>Kompaniya haqidagi ma’lumotlarni kiriting</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={style.formImg}>
          <img src={formData.selectedImage} width={84} height={84} alt="" />
          <label htmlFor="file-upload" className={style.uploadButton}>
            Yuklash
            <input
              id="file-upload"
              type="file"
              placeholder=" "
              onChange={handleFileChange}
            />
          </label>
          {errors.selectedImage && (
            <span className={style.error}>{errors.selectedImage}</span>
          )}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="companyForm">
            Kompaniya nomi <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Kompaniya nomi"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          {errors.company && (
            <span className={style.error}>{errors.company}</span>
          )}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="emailForm">
            Email <span>*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className={style.error}>{errors.email}</span>}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="phoneForm">
            Telefon raqami <span>*</span>
          </label>
          <input
            type="number"
            placeholder="Telefon raqami"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className={style.error}>{errors.phoneNumber}</span>
          )}
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
            <label htmlFor="countryForm">
              Davlat<span>*</span>
            </label>
            <select
              name="country"
              id="countryForm"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">Davlat</option>
              <option value="uzbekistan">UZ</option>
              <option value="kazakhstan">KG</option>
              <option value="russia">RU</option>
            </select>
            {errors.country && (
              <span className={style.error}>{errors.country}</span>
            )}
          </div>
          <div className={style.formInputs}>
            <label htmlFor="cityForm">
              Shahar<span>*</span>
            </label>
            <select
              name="city"
              id="cityForm"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Shahar</option>
              <option value="tashkent">Toshkent</option>
              <option value="fergana">Fergana</option>
              <option value="andijon">Andijon</option>
            </select>
            {errors.city && <span className={style.error}>{errors.city}</span>}
          </div>
        </div>
        <div className={style.formInputs}>
          <label htmlFor="livingPlaceForm">
            Yashash joyi <span>*</span>
          </label>
          <input
            type="text"
            placeholder="Yashash joyi"
            name="livingPlace"
            value={formData.livingPlace}
            onChange={handleChange}
          />
          {errors.livingPlace && (
            <span className={style.error}>{errors.livingPlace}</span>
          )}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="employeeCountForm">
            Hodimlar soni<span>*</span>
          </label>
          <select
            id="employeeCountForm"
            name="employeeCount"
            value={formData.employeeCount}
            onChange={handleChange}
          >
            <option value="">Hodimlar soni</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          {errors.employeeCount && (
            <span className={style.error}>{errors.employeeCount}</span>
          )}
        </div>
        <div className={style.formInputs}>
          <label htmlFor="descriptionForm">
            Izoh<span>*</span>
          </label>
          <textarea
            name="description"
            placeholder="Kompaniya haqida izoh qoldiring"
            rows={6}
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className={style.error}>{errors.description}</span>
          )}
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
