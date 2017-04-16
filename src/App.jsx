import React, { Component } from 'react';
import './App.css';
import InputFields from './InputFields'
const htmlparser = require('fast-html-parser');
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                </div>
            `
        }
    }
    Parser = (clause) => {
        const root = htmlparser.parse(clause);
        return root.querySelectorAll('.mark').map((node,i) => {
            const textdata = node.childNodes[0].rawText
            return textdata;
        })
    }
    handleChange = (i,inputfield, e) => {
        var change = {};
        change[`${i}${inputfield}`] = e.target.value;
        this.setState(change);
        document.getElementsByClassName('mark')[i].innerHTML = e.target.value;
    }
    componentDidMount (){
        const inputFields = this.Parser(this.state.sampleClause);
        const newStateVars = {};
        inputFields.forEach((field,i)=>{
            newStateVars[`${i}${field}`] = '';
        })
        const allMarks = document.getElementsByClassName('mark');
        for (let i = 0; i < allMarks.length; i++) {
            allMarks[i].innerHTML = 'Field '+ i;
        }
        this.setState(Object.assign({},this.state,newStateVars))
    }
    render() {
        const { sampleClause } = this.state;
        const inputFields = this.Parser(sampleClause);
        const reactElement = htmlToReactParser.parse(sampleClause);
        return (
            <div className="App" >
                <div>
                    <h1>Clause Aid </h1>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3" > 
                            <InputFields 
                                inputFields={inputFields}
                                handleChange={this.handleChange}
                            />
                        </div> 
                        <div className="col-md-9" >
                            <div className="well">
                            {reactElement}
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>
        );
    }
}

export default App;