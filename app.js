const imgsContainer = document.querySelector('.dogs-images');
const input = document.querySelector('#dogName');
const btnSearch = document.querySelector('.btn-search');
const btnRandom = document.querySelector('.btn-random');
const config = { header: { Accept: "application/json" } }

const newImage = async (callback) => {
   const getImg = await callback()
   const newImg = document.createElement("img")
   const newAttr = document.createAttribute("src")
   newImg.setAttributeNode(newAttr)
   if (imgsContainer.childNodes.length < 1) {
      imgsContainer.append(newImg)
      newAttr.value = `${getImg}`
   } else { 
      imgsContainer.childNodes[0].attributes.src.value = `${getImg}`
   }
}

const getDogBreed = async (breed = input.value.toLowerCase()) => {
   try {
      const res = await axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
      return res.data.message;
   } catch (e) {
      return 'ERROR!!!', e;
   }
}

const getRandomImage = async () => {
   try {
      const res = await axios.get("https://dog.ceo/api/breeds/image/random", config);
      return res.data.message;
   } catch (e) {
      return 'ERROR!!!', e;
   }
}

btnSearch.addEventListener('click', () => { newImage(getDogBreed)});
btnRandom.addEventListener('click', () => { newImage(getRandomImage)});
