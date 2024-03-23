import React from 'react';

function AddArticle() {
  return (
    <div>
      <p className="display-3 text-center text-secondary">Add New Article</p>
      <form className="w-50 mx-auto mt-3">
        <div className="input-group input-group-lg"></div>
      </form>
      <div className="mb-3">
        <label htmlFor="category">Select Category</label>
        <text></text>
      </div>
    </div>
  );
}

export default AddArticle;
