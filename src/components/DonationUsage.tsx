export const DonationUsage = () => {
    return (
        <div>
              
            <h1 className="text-primary">Donation Usage</h1>
            <p className="text-secondary">
              While we have plans to do rounds of funding via NFT sales in the future, we are putting all of our efforts toward building the core functionality out. Therefore, all donations will go towards ensuring the success of this project. We plan to put all donations received towards the following initiatives in this order: 
            </p>
        
            <ol className="list-group list-group-numbered rounded-1">
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Audits</div>
                    Ensuring we have proper auditing done on our smart contracts before we go live is our top priority.
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Block-Ops DAO</div>
                    In order to ensure the long-term success of this project, we plan to establish a DAO that will have voting rights on the long-term vision and direction of this project.
                    </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">Developer Morale</div>
                    Full transparency here, developing a project of this size takes a great deal of time and effort. After we have secured funding to properly audit our codebase and initially fund our DAO, we will be dispersing the remaining funds to the core development team as a "Thank You" for working on this project.
                    </div>
                </li>
            </ol>

          </div>
    )
}