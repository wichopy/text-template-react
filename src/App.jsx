import React, { Component } from 'react';
// const ReactDOMServer = require('react-dom/server');
import logo from './logo.svg';
import './App.css';
const htmlparser = require('fast-html-parser');
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            '0[∙]': '',
            '1[∙]': '',
            '2[∙, an individual/corporation]': '',
            '3[INSERT ADDRESS]': '',
            sampleClause: `
    <div class="dat_clause_language" cat-id="7057" clause-id="145767">
        <p class="dat_snippet" clause-id="145767">
            <bucket id="145767" class="mceNonEditable"></bucket>
            This non-disclosure agreement (the “<b>Agreement</b>”) is dated as of 
            <span class="mark">[∙]</span> (the “<b>Effective Date</b>”)<i> </i>between <span class="mark">[∙]</span>
            (the<b> “Company”</b>) and <span class="mark">[∙, an individual/corporation]</span><i><b> </b></i>located at 
            <span class="mark">[INSERT ADDRESS]</span> (the “<b>Recipient</b>”, and together with the Company, each, individually a “<b>Party</b>” 
            and collectively the “<b>Parties</b>”).<a class="variant-paw mceNonEditable" data-id="7057"></a>
        </p>
        <div class="diff_check" clause-id="145767">
        </div>
        <a href="#" title="Edit" class="edit_this_clause" clause-id="145767">
            <i class="fa fa-pencil" aria-hidden="true"></i>
        </a>
        <a href="#s" title="Comment" class="comment_on_this_clause" clause-id="145767">
            <i class="fa fa-comment" aria-hidden="true"></i>
        </a>
    </div>`
        }
    }
    Parser = (clause) => {
        const root = htmlparser.parse(clause);
        return root.querySelectorAll('.mark').map(node => node.childNodes[0].rawText)
    }
    handleChange = (name, e) => {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }
    printMethods = (obj) => {
        for (var k in obj)
        {
            if (typeof obj[k] === "object" && obj[k] !== null)
                this.printMethods(obj[k]);
            else
                console.log(k)
        }
    }
    render() {
        const { sampleClause } = this.state;
        const inputFields = this.Parser(sampleClause);
        const reactElement = htmlToReactParser.parse(sampleClause);
        // this.printMethods(reactElement)
        console.log(reactElement)
        return (
            <div className="App" >
                <div className="App-header" >
                    <img src={ logo }
                    className="App-logo"
                    alt="logo" />
                    <h2 > Welcome to React </h2>  
                </div > 
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2" > 
                            {inputFields.map((inputField, i) => {
                                return ( 
                                    <div key={ i } >
                                        <p > { i+'. '+inputField } </p> 
                                        <input placeholder={ inputField } onChange={(e)=>this.handleChange(i+inputField,e)}/> 
                                    </div>
                                )
                                })
                            } 
                        </div> 
                        <div className="col-md-10" >
                            <div className="dat_clause_language" cat-id="7057" clause-id="145767">
                                <p className="dat_snippet" clause-id="145767">
                                    <bucket id="145767" className="mceNonEditable"></bucket>
                                    This non-disclosure agreement (the “<b>Agreement</b>”) is dated as of 
                                    <span className="mark">{this.state['0[∙]']}</span> (the “<b>Effective Date</b>”)<i> </i>between <span className="mark">{this.state['1[∙]']}</span>
                                    (the<b> “Company”</b>) and <span className="mark">{this.state['2[∙, an individual/corporation]']}</span><i><b> </b></i>located at 
                                    <span className="mark">{this.state['3[INSERT ADDRESS]']}</span> (the “<b>Recipient</b>”, and together with the Company, each, individually a “<b>Party</b>” 
                                    and collectively the “<b>Parties</b>”).<a className="variant-paw mceNonEditable" data-id="7057"></a>
                                </p>
                                <div className="diff_check" clause-id="145767">
                                </div>
                                <a href="#" title="Edit" className="edit_this_clause" clause-id="145767">
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </a>
                                <a href="#s" title="Comment" className="comment_on_this_clause" clause-id="145767">
                                    <i className="fa fa-comment" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>
        );
    }
}

export default App;