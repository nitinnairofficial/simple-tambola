import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public numberList = [];
  public generatedNumberList = [];
  public generatedNumber = 0;

  public ngOnInit() {
    const storedNumberList = JSON.parse(localStorage.getItem('TAMBOLA'));
    if (storedNumberList) {
      this.numberList = storedNumberList;
      this.generatedNumber = Number(
        localStorage.getItem('LAST_GENERATED_NUMBER')
      );
    } else {
      this.resetNumberList();
    }
  }

  public generateRandomNumber() {
    this.generatedNumber = Math.floor(Math.random() * 90 + 1);

    if (this.generatedNumberList.includes(this.generatedNumber)) {
      this.generateRandomNumber();
    }

    localStorage.setItem(
      'LAST_GENERATED_NUMBER',
      JSON.stringify(this.generatedNumber)
    );

    const storedGeneratedList = JSON.parse(
      localStorage.getItem('GENERATED_NUMBER_LIST')
    );
    if (storedGeneratedList) {
      this.generatedNumberList = JSON.parse(
        localStorage.getItem('GENERATED_NUMBER_LIST')
      );
      this.generatedNumberList.push(this.generatedNumber);
    } else {
      this.generatedNumberList.push(this.generatedNumber);
    }
    this.generatedNumberList = [...new Set(this.generatedNumberList)];
    localStorage.setItem(
      'GENERATED_NUMBER_LIST',
      JSON.stringify(this.generatedNumberList)
    );

    this.numberList.find(
      (x) => x.label === this.generatedNumber
    ).isChecked = true;
    localStorage.setItem('TAMBOLA', JSON.stringify(this.numberList));
  }

  public resetBoard() {
    if (window.confirm('Are you sure you want to reset board?')) {
      localStorage.clear();
      this.generatedNumberList = [];
      this.resetNumberList();
      this.generatedNumber = 0;
    }
  }

  public resetNumberList() {
    const list = Array.from(Array(90).keys());
    this.numberList = list.map((x) => {
      return {
        label: x + 1,
        isChecked: false,
      };
    });
    localStorage.setItem('TAMBOLA', JSON.stringify(this.numberList));
  }
}
