class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.integer :user_id
      t.integer :supplier_id
      t.integer :category_id
      t.string :name
      t.string :description
			t.string :image
			t.integer :quantity

      t.timestamps
    end
  end
end
