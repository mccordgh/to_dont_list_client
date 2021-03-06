import API_URL from './api-url.js';

export default {
  getItems(self) {
    fetch(`${API_URL}/items`, {
      method: 'GET',
    })
    .then(response => response.json())
    .then((data) => {
      data = data.map(item => Object.assign(item, {
        editingTitle: !item.title,
      }));

      self.setState({ items: data });
      self.setState({dataLoading: false});
    });
  },

  createItem(self, index) {
    const item = self.state.items[index];
    const itemObj = {
      title: item.title,
      completedCount: item.completedCount,
    }

    fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then(() => {
      this.getItems(self);
    });
  },

  deleteItem(self, index) {
    const item = self.state.items[index];

    const deleteLocally = () => {
      self.setState(state => (
        { items: state.items.filter(item => item !== state.items[index]) }
      ));
    }

    const deleteOnServer = () => {
      fetch(`${API_URL}/items/${item._id}`, {
        method: 'DELETE',
      })
      .then(() => {
        this.getItems(self);
      });
    }

    if (!item._id) {
      deleteLocally();

      return;
    }

    deleteOnServer();
  },

  updateItem(self, index) {
    const item = self.state.items[index];
    const itemObj = {
      id: item._id,
      title: item.title,
      completedCount: item.completedCount,
    }

    fetch(`${API_URL}/items/${item._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(itemObj),
    })
    .then(response => response.json())
    .then(() => {
      this.getItems(self);
    });
  }

}