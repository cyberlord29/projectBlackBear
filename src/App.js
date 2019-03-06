import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {scaleTime , scaleLinear} from 'd3-scale'
import { select as d3Select } from 'd3-selection';

import './index.css'
import {
  Panel,
  Button
} from 'react-bootstrap'
import {
  setParams,
} from './actions/lisence-actions'
import cx from 'classnames'
import * as fc from 'd3fc'
import d3 from 'd3'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showCreate:true
    }
  }

  

  render () {
    var data = fc.randomFinancial()(120);
    console.log(data)

    var yExtent = fc.extentLinear()
      .accessors([
        function(d) { return d.high; },
        function(d) { return d.low; }
      ]);

    var xExtent = fc.extentDate()
      .accessors([function(d) { return d.date; }]);

    var gridlines = fc.annotationSvgGridline();
    var candlestick = fc.seriesSvgCandlestick();
    var multi = fc.seriesSvgMulti()
        .series([gridlines, candlestick]);

    var chart = fc.chartSvgCartesian(
        fc.scaleDiscontinuous(scaleTime()),
        scaleLinear()
      )
      .yDomain(yExtent(data))
      .xDomain(xExtent(data))
      .plotArea(multi);

    //  var d3fcchart = d3.select()
    //   .datum(data)
    //    .call(chart)

    //  console.log('DFC:',d3fcchart)
  return(
    <div style={{width:'50%',height: '250px'}} 
    ref={node => d3Select(node).datum(data).call(chart)}>
    </div>
  )
  }
}

App.propTypes = {

}

const mapStateToProps = ({  }) => {
  return {
      
    }
}

export default connect(
  mapStateToProps,
  {
    setParams,
  }
)(App)