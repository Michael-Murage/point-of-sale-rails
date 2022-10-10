class CreateSales < ActiveRecord::Migration[6.1]
  def change
    create_table :sales do |t|
      t.integer :user_id
      t.integer :customer_id
			t.string :items_sold
			t.integer :total

      t.timestamps
    end
  end
end
