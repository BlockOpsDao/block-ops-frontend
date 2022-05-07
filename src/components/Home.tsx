
import logo from '../blockchain.png';

export const Home = () => {

    return (
        <div className="home">
          <div className="container">
            <div className="row align-items-center my-5">
              <div className="col-lg-7">
                <img
                  className="img-fluid rounded mb-4 mb-lg-0"
                  src={ logo }
                  alt=""
                />
              </div>
              <div className="col-lg-5">
                <h1 className="text-primary">Block Ops - Coming Soon!</h1>
                <p className="text-secondary">
                  We are building a tool that will change the world of Machine Learning forever!
                </p>
                <p  className="font-italic text-slate"><i>The Block-Ops project is under active development so check back frequently for updates</i></p>
              </div>
            </div>
          </div>
        </div>
      );
}