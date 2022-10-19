import Footer from "../Footer";
import Header from "../Header";
import Option from "../Option";
import Repo from "../Repo";

function RepoWrapper() {
  return (
    <>
      <Header />
      <Repo />
      <Option />
      {/* <IssueWrapper /> */}
      <Footer />
    </>
  );
}

export default RepoWrapper;
