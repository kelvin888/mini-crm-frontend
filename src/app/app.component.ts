import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

type Rates = {
  rates: Rates[];
};

type Response = {
  rates: Rates;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  rates: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery<Response>({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `
      })
      .valueChanges.subscribe(result => {
        this.rates = result.data && result.data.rates;
        this.loading = result.loading;
        this.error = result.errors;
      });
  }
}
