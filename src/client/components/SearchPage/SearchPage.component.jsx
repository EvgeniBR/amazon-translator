/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../../node_modules/react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header.component';
import AmazonItame from '../AmazonItame/AmazonItame.conponent';
import './SearchPage.css';

toast.configure();
const SearchPage = () => {
  const [link, Setlink] = useState('');
  const [item, setItem] = useState({});
  const [amazonItems, setamazonItems] = useState([]);
  const [hebrewTranslate, SetHebrewTranslate] = useState('');
  const [arabicTranslate, SetArabicTranslate] = useState('');
  const [amazonObject, setAmazonObject] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  const setSearchLink = (e) => {
    Setlink(e.target.value);
  };

  const doTranslation = async (title, lang, cb) => {
    try {
      const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2', {}, {
        params: {
          q: title,
          target: lang,
          key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
        }
      });
      cb(data.data.translations[0].translatedText);
      return data.data.translations[0].translatedText;
    } catch (e) {
      return toast.error('🦄 Faild to translate, Pleas try again!!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getDataFromLink = async (url) => {
    setIsClicked(true);
    const data = await axios.post('http://localhost:8080/api/puppeteer', {
      url,
    });
    setItem({
      title: data.data.title,
      price: data.data.price,
      pic: data.data.pic,
      id: data.data.id
    });
    await doTranslation(data.data.title, 'he', SetHebrewTranslate);
    await doTranslation(data.data.title, 'ar', SetArabicTranslate);
    Setlink('');
    setIsClicked(false);
  };

  useEffect(() => {
    setAmazonObject({
      id: item.id,
      originalTitle: item.title,
      price: item.price,
      pic: item.pic,
      heb: hebrewTranslate,
      ar: arabicTranslate,
      link,
    });
  }, [arabicTranslate]);

  useEffect(() => {
    if (amazonObject.id === undefined) {
      return;
    }
    if (JSON.parse(localStorage.getItem('amazonItemsList')).some(product => product.id === amazonObject.id)) {
      toast.warn('🦄 Already exists!!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success('🦄 New Item!!!', {
        position: 'top-center',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      const newItems = [amazonObject, ...amazonItems];
      localStorage.setItem('amazonItemsList', JSON.stringify(newItems));
      setamazonItems(newItems);
    }
  }, [amazonObject]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('amazonItemsList'))) {
      setamazonItems(JSON.parse(localStorage.getItem('amazonItemsList')));
    }
  }, []);
  return (
    <div>
      <Header />
      <fieldset>
        <legend> Amazon Link Translator </legend>
        <form>
          <label htmlFor="text">insert amazon product link here:</label>
          <input id="text" type="text" value={link} onChange={setSearchLink} />
          {isClicked ? (
            <button className="button button--loading" type="button" onClick={() => getDataFromLink(link)}>
              <span className="button__text">Go Fetch</span>
            </button>
          ) : (
            <button className="button" type="button" onClick={() => getDataFromLink(link)}>
              <span className="button__text">Go Fetch</span>
            </button>
          )
          }
        </form>
      </fieldset>
      <fieldset>
        <legend>Current Search:</legend>
        {amazonObject.ar === '' ? <div>your search will show here</div> : <AmazonItame data={amazonObject} />}
      </fieldset>
    </div>
  );
};


export default SearchPage;
