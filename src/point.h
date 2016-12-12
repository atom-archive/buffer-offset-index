#ifndef POINT_H_
#define POINT_H_

#include <iostream>
#include "nbind/api.h"

struct Point {

  unsigned row;
  unsigned column;

  Point(void) : row(0), column(0) {
  }

  Point(unsigned initial_row, unsigned initial_column) : row(initial_row), column(initial_column) {
  }

  unsigned getRow(void) const {
    return row;
  }

  unsigned getColumn(void) const {
    return column;
  }

  void setRow(unsigned new_row) {
    row = new_row;
  }

  void setColumn(unsigned new_column) {
    column = new_column;
  }

  void toJS(nbind::cbOutput output) {
      output(row, column);
  }

};

#endif // POINT_H_
