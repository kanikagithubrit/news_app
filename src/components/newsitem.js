import React, { Component } from 'react'

export class newsitem extends Component {

    render() {
        let {title,description,imageUrl , newsurl, author,date,source} = this.props;
        return (
            <div>
                <div className="card">
                   <img src={!imageUrl?"https://live-production.wcms.abc-cdn.net.au/0254092e58bc61b8502ae9dc83a1554d?impolicy=wcms_crop_resize&cropH=654&cropW=1163&xPos=0&yPos=202&width=862&height=485" : imageUrl} className="card-img-top" alt="..."/>
                   <div className="card-body">
                  <h5 className="card-title">{title}<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span></h5>
                  <p className="card-text">{description}</p>
                  <p className="card-text"><small className="text-muted">By {!author?"Unknown" : author} on {new Date(date).toGMTString()}</small></p>

                  <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
               </div>
      </div>
            </div>
        )
    }
}

export default newsitem
