import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const htmlparser = require('fast-html-parser');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sampleClause: `<div class="dat_clause_language" cat-id="7057" clause-id="145767">
      <p class="dat_snippet" clause-id="145767"><bucket id="145767" class="mceNonEditable">
      </bucket>This non-disclosure agreement (the “<b>Agreement</b>”) is dated as of 
      <span class="mark">[∙]</span> (the “<b>Effective Date</b>”)<i> </i>between <span class="mark">[∙]</span>
       (the<b> “Company”</b>) and <span class="mark">[∙, an individual/corporation]</span><i><b> </b></i>located at 
       <span class="mark">[INSERT ADDRESS]</span> (the “<b>Recipient</b>”, and together with the Company, each, individually a “<b>Party</b>” 
       and collectively the “<b>Parties</b>”).<a class="variant-paw mceNonEditable" data-id="7057"></a></p>
       <div class="diff_check" clause-id="145767"></div><a href="#" title="Edit" class="edit_this_clause" clause-id="145767">
       <i class="fa fa-pencil" aria-hidden="true"></i></a><a href="#s" title="Comment" class="comment_on_this_clause" clause-id="145767">
       <i class="fa fa-comment" aria-hidden="true"></i></a></div>`
        }
    }
    Parser = (clause) => {
        const root = htmlparser.parse(clause);
        console.log(root.querySelectorAll('.mark').map(node => node.childNodes[0].rawText));
        return root.querySelectorAll('.mark').map(node => node.childNodes[0].rawText)
    }

    render() {
        const { sampleClause } = this.state;
        const inputFields = this.Parser(sampleClause);
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
                                        <p > { inputField } </p> 
                                        <input placeholder={ inputField }/> 
                                    </div>
                                )
                                })
                            } 
                        </div> 
                        <div className="col-md-10" >
                            {sampleClause}
                        </div> 
                    </div> 
                </div> 
            </div>
        );
    }
}

export default App;