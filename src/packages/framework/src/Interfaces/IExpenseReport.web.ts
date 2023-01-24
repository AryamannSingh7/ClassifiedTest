// Customizable Area Start
export interface ICategoryExpense {
  currency: string;
  expenses: number;
  title: string;
}

export interface ICityExpense {
  city_name: string;
  currency: string;
  expenses: number;
  society_management_id: number;
  society_management_name: string;
}

export interface IUnitExpense {
  building_id: number;
  building_name: string;
  currency: string;
  expenses: number;
  id: number;
  unit_name: string;
}

export interface IExpense {
  id: string;
  type: string;
  attributes: {
    id: number;
    expense_date: string;
    expense_amount: number;
    issue_title: string;
    expense_category_id: number;
    address: {
      currency: string;
    };
    building_management: {
      id: number;
      name: string;
    };
    apartment_management: {
      id: number;
      apartment_name: string;
    };
    resolved_by: string;
    expense_category: {
      id: number;
      title: string;
    };
    summary: string;
  };
}

export interface IExpenseCategory {
  id: number;
  title: string;
}

export interface ICityWiseRentedEmpty {
  city_name: string;
  society_management_id: number;
  society_management_name: string;
  rented: number;
  empty: number;
}
// Customizable Area End
