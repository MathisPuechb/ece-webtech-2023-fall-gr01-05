const Header =require ('../components/header');
const Footer =require('../components/footer');
const datas = require ('../data/indexData');


const Home = () => {
  return (
   
    <div>
      <Header />
      <h1>Home Page</h1>
      <Footer />
    </div>
   
  );
};

export default Home;