class CreateSuppliers < ActiveRecord::Migration[6.1]
  def change
    create_table :suppliers do |t|
      t.string :location
      t.string :name
      t.string :schedule
			t.integer :user_id
			t.string :image

      t.timestamps
    end
  end
end
