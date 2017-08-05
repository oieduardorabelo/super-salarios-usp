import React from "react";
import ReactDOM from "react-dom";
import fuzzysearch from "fuzzysearch";

import AppBar from "material-ui/AppBar";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import { Card, CardTitle, CardHeader, CardText } from "material-ui/Card";

import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import List from "react-virtualized/dist/commonjs/List";

import LogoSuperUsp from "./images/logo-super-usp.png";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueFilter: ""
    };

    this._debounceFilter = null;
    this.onChangeFilter = this.onChangeFilter.bind(this);

    this.getListFiltered = this.getListFiltered.bind(this);

    this._rowCount = this._rowCount.bind(this);
    this._rowRenderer = this._rowRenderer.bind(this);
  }

  onChangeFilter(event) {
    const value = event.target.value;

    if (this._debounceFilter) {
      clearTimeout(this._debounceFilter);
    }

    this._debounceFilter = setTimeout(() => {
      this.setState({
        valueFilter: value
      });
    }, 300);
  }

  getListFiltered() {
    const { valueFilter } = this.state;
    const { store } = this.props;
    const toLwc = str => str.toLowerCase();
    const serachIn = (fn, obj) => {
      return fn(
        `${obj["Função"]}${obj["Instituto"]}${obj["Nome"]}${obj["Salário"]}`
      );
    };

    return Object.values(store).filter(person =>
      fuzzysearch(toLwc(valueFilter), serachIn(toLwc, person))
    );
  }

  _rowCount() {
    return this.getListFiltered().length;
  }

  _rowRenderer({ index, key, style }) {
    const personData = this.getListFiltered()[index];

    return (
      <div key={key} style={style}>
        <Card>
          <CardHeader
            title={personData["Nome"]}
            subtitle={personData["Função"]}
            avatar=""
          />
          <CardText>
            <strong style={{ marginRight: 8 }}>Instituto:</strong>
            <span style={{ marginRight: 8 }}>
              {personData["Instituto"]}
            </span>
            <strong style={{ marginRight: 8 }}>Salário:</strong>
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL"
            }).format(personData["Salário"])}
          </CardText>
        </Card>
      </div>
    );
  }

  render() {
    return (
      <section>
        <AppBar
          title="Super Salários USP"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              label={`Última atualização, ${Intl.DateTimeFormat("pt-BR", {
                weekday: "long",
                month: "long",
                day: "numeric"
              }).format(new Date())}`}
            />
          }
        />
        <div className="Content">
          <img
            src={LogoSuperUsp}
            role="presentation"
            style={{
              position: "fixed",
              right: 0,
              bottom: 0,
              zIndex: 1,
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px"
            }}
          />
          <Paper zDepth={2}>
            <TextField
              fullWidth
              hintText="Procure o seu professor!"
              onChange={event => this.onChangeFilter(event)}
              underlineShow={false}
              style={{ padding: 12 }}
            />
          </Paper>
          <section className="AutoSizerWrapper" style={{ paddingTop: 24 }}>
            <AutoSizer>
              {({ width, height }) => {
                if (this._rowCount()) {
                  return (
                    <List
                      height={height}
                      rowCount={this._rowCount()}
                      rowHeight={180}
                      rowRenderer={this._rowRenderer}
                      width={width}
                    />
                  );
                }

                return (
                  <Paper>
                    <Card>
                      <CardTitle title="Loading..." />
                    </Card>
                  </Paper>
                );
              }}
            </AutoSizer>
          </section>
        </div>
      </section>
    );
  }
}

export default App;
