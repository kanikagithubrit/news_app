import React, { Component } from 'react'
import Newsitem from './newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {   //articles ko ek array bna diya
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    
    constructor(){
        super();
        this.state = {
           articles: [],
           loading: true,
           page: 1,
           totalResults: 0

        }
    }
    async componentDidMount(){       //render isse phle run hoga  //async ka mtlb h ki aap isko async krde or wait krein function run hone ka
        this.props.setProgress(10);  // set progress ko as a prop pass krdiya
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});   //jb component mount ho rha h tb bhi loading dikha di
        let data = await fetch(url);       //fetch api leti h ek url or return krti hai ek promise
        this.props.setProgress(30);
        let parsedData = await data.json();   //async await use krne se ye wait krta hai apni body ke ander kuch promises ke resolve hone ka
        this.props.setProgress(70);
        console.log(parsedData);      //isse upper wali line mein kya kiya ki jo data aaya hai usko json mein parse krdiya //is line mein humein json mil gyi
        this.setState({articles: parsedData.articles ,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100); //jb data fetch ho jaye , json vghra pass ho jaega tb progress ko 100 krdiya 
    }
    handlePrevClick = async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ef37523850784d7baf12e08510aa5a73&page=${this.state.page -1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);       
        let parsedData = await data.json();   
        console.log(parsedData);      
        this.setState({
            page: this.state.page -1,
            articles: parsedData.articles,
            loading: false
        })

    } 
    handleNextClick = async ()=>{   //page size mtlb ek page pr kitne articles honge
        if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ef37523850784d7baf12e08510aa5a73&page=${this.state.page +1}&pagesize=${this.props.pageSize}`;
        this.setState({loading:true}); //api ko jb jb hit krega tb loading ko true krdiya aisa likh ke
        let data = await fetch(url);       
        let parsedData = await data.json();   
        console.log(parsedData);      
        this.setState({
            page: this.state.page +1,
            articles: parsedData.articles,
            loading: false //or jb sara data aa jaega tb loading false krdiya
        })
    }

    }
    fetchMoreData = async () => { 
       this.setState({page: this.state.page +1})
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({loading:true});   //jb component mount ho rha h tb bhi loading dikha di
        let data = await fetch(url);       //fetch api leti h ek url or return krti hai ek promise
        let parsedData = await data.json();   //async await use krne se ye wait krta hai apni body ke ander kuch promises ke resolve hone ka
        console.log(parsedData);      //isse upper wali line mein kya kiya ki jo data aaya hai usko json mein parse krdiya //is line mein humein json mil gyi
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })

      };

    render() {
        return (
            <>
                <h1 className="text-center">NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                  dataLength={this.state.articles.length}
                 next={this.fetchMoreData}
                 hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
                >
                
                <div className="container">
                <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                         <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                         </div>
                    })

                    }
            </div>
            </div>
            </InfiniteScroll>
            </>
            /* <div className="container d-flex justify-content-between my-2">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
            </div> */ //slice is for limiting the number of characters in word
        )
    }
}

export default news
