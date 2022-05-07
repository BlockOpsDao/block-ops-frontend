import { AnalyticEventTracker } from "./AnalyticEventTracker";

export const About = () => {
  const gaEventTracker = AnalyticEventTracker('About');

    return (
        <div className="about">
          <div className="container">
            <div className="row align-items-center my-5 d-flex justify-content-center">
              <div className="col-lg-5 align-items-center">
                <h1 className="font-weight-light text-slate mt-5">TL;DR</h1>
                <p className="text-slate mb-5">We seek to bring transparency and trustless-ness to the world of Machine Learning by tracking and powering work via blockchain technology.</p>
              </div>
            </div>
    
            <div className="row align-items-left my-5">
              <div className="col-lg-8">
                  <h1 className="font-weight-light text-primary mt-5">Experimentation Tracking</h1>
                  <p className="text-slate">
                    Experimentation tracking is a crucial piece of the machine learning lifecycle. It is the process by which metrics & parameters 
                    are stored for analysis and traceability. For the data scientist, experimentation tracking tools are fantastic ways of storing
                    what model architectures and parameters have been tried, what worked, and what didn't when trying to solve a problem with 
                    machine learning. For organizations, they serve as a lineage tracker providing confidence in how a model was created. Whether 
                    you are a hands-on-keyboard developer or a project manager overseeing an ML-integrated product, reproducibility is a highly 
                    sought-after feature in any MLOps pipeline. Using an experimentation tracking tool delivers said reproducibility.
                  </p>
    
                  <p className="text-slate">
                    There are some really great experimentation tracking tools available both in the open-source community and from companies. In my 
                    personal experience, I have had great success using tools like <a className="link-slate" href="https://mlflow.org" onClick={()=>gaEventTracker('a_mlflow')}>MLflow</a>, &nbsp; 
                    <a className="link-slate" href="https://wandb.ai/site" onClick={()=>gaEventTracker('a_wandb')}>Weights & Biases</a>, and <a className="link-slate" href="https://neptune.ai/" onClick={()=>gaEventTracker('a_neptune')}>Neptune</a>. Where these tools fall short,
                    is coincidentally where blockchains thrive: Decentralization. All of these tools use some sort of centralized database for metric 
                    and parameter storage. While that makes perfect sense from an "I need to store relational data"-perspective, it doesn't provide the 
                    decentralized distribution that comes with a blockchain like Ethereum. With this project, we aim to take inspiration from many of 
                    the great experimentation tracking tools and to provide a platform where these metrics and parameters can be stored permenantly on 
                    a blockchain so that they can be retrieved and shared without managing a centralized data store.
                  </p>
                </div>
            </div>
    
            <div className="row align-items-left my-5">
              <div className="col-lg-4"> </div>
              <div className="col-lg-8">
                  <h1 className="font-weight-light text-primary">Artifact Storage</h1>
                  <p className="text-slate">
                    While less mature than the experimentation tracking space, artifact storage is an aspect of the machine learning lifecycle that is 
                    equally crucial. Regardless of if you are an individual storing model artifacts on a personal computer or you work at an established 
                    enterprise regularly storing model artifacts in object storage, you run the risk of storage failure. While this risk may be decently 
                    high in the case of relying on a western digital hard drive and extremely low in the case of object storage like AWS S3, the risk of 
                    failure is still present. By integrating with a permenant artifact storage in Arweave, we guarantee your artifacts will be stored in 
                    the cloud forever.
    
                  </p>
    
                  <p className="text-slate">
                    Managing access to these data stores can also be tricky. While the intracacies of trying to share a model stored on someone's laptop 
                    are apparent for anyone who's been in that position, sharing model artifacts, even at mature enterprises, can also be a challenge. Each 
                    cloud provider has their own set of permissioned access systems that need to first be learned and then continously managed. When utilizing 
                    the blockchain, you control access with a simple approval or denial to each wallet. Moreover, you can sell access to these model artifacts 
                    via a Non-Fungible Token (NFT).
    
                  </p>
                </div>
            </div>
    
    
            <div className="row align-items-left my-5">
              <div className="col-lg-8">
                  <h1 className="font-weight-light text-primary">Distributed Training</h1>
                  <p className="text-slate">
                    Over the last 5 years, distributed training has transitioned from being a buzz-word cv-bait term to a true necessity in the various fields 
                    of deep learning. Distributed training is the process of training a single machine learning model using multiple computers, often referred to
                    as "nodes". These nodes work together, mimicking one large computer, to make training large models more efficient. Distributed training is 
                    getting more mature every day, but it's often only scoped to a developer using multiple computers for a single project. We aim to enable 
                    projects to utilize multiple developers each using multiple computers for a single project. This has been made possible as we have established 
                    the ability to decentrally distribute experiment details and model artifacts.
                  </p>
                </div>
            </div>
    
            <div className="row align-items-left my-5">
              <div className="col-lg-4"> </div>
              <div className="col-lg-8">
                  <h1 className="font-weight-light text-primary">Trusted Freelancing</h1>
                  <p className="text-slate">
                    The field of data science is an interesting one. When I was coming up, beginners would pay real money to get access to data and projects so 
                    that they could fluff up their resume (I myself am guilty of this). Beginners would also compete against each other in extremely competitive 
                    data science competitions (where are my Kaggle nerds at!?!?) at the benefit of organizations seeking to outsource their machine learning work. 
                    While these processes were a fantastic jump-start into the world of data science, in retrospect it feels very similar to old-school internships 
                    full of coffee-fetching and data-entry with no pay.
                  </p>
    
                  <p className="text-slate">
                    We aim to provide a decentralized platform that enables any entity to define a machine learning problem to solve, a set of acceptance criteria (AC) 
                    to be met, and a reward to be given to the winning developer. All developers on the blockchain then have an equal opportunty to solve the defined 
                    problem and earn the winning prize. Developers also have the ability to co-sign a smart contract and work together to share a percentage of the 
                    reward that is calculated based on the metrics reported via the experimentation tracking service. Access to the model experimentation details and 
                    artifact are stored on the blockchain and shared with the project-owner to be used at their descretion via a Non-Fungible Token.
                  </p>
                </div>
            </div>
    
          </div>
        </div>
      );
}