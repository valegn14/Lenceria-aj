import Footer2 from "./Footer2";
import Header2 from "./Header2";



export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header2/>
      <main className="flex-grow h-full bg-main-bg bg-cover bg-center bg-no-repeat m-0 p-0">
        {children}
      </main>
      <Footer2/>   
    </div>
  );
}
