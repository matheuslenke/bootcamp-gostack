import React, { Component } from 'react';

import PostItem from './PostItem';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Naruto Uzumaki",
          avatar: "https://cdn.falauniversidades.com.br/wp-content/uploads/2019/10/naruto.jpg",
        },
        date: "27 jan 2020",
        content: "Eu serei o maior hokage de todos!",
        comments: [
          {
            id: 1,
            author: {
              name: "Sasuke Uchiha",
              avatar: "https://criticalhits.com.br/wp-content/uploads/2018/08/sasuke-rinnegan-01.jpg"
            },
            content: "Ai que inferno de garoto chato. Vai arranjar o que fazer, vai"
          },
          {
            id: 2,
            author: {
              name: "Sakura Haruno",
              avatar: "https://vignette.wikia.nocookie.net/naruto/images/c/cf/Sakura_%28Naruto_Cl%C3%A1ssico%29.png/revision/latest?cb=20180211141243&path-prefix=pt-br"
            },
            content: "Coitada dessa iludida. Quem é você na fila do pão de Konoha? é aldeia da folha não aldeia da PENA que eu sinto de vc"
          },
          {
            id: 2,
            author: {
              name: "Hinata Hyuga :)",
              avatar: "https://vignette.wikia.nocookie.net/naruto-pedia/images/9/97/Hinata.png/revision/latest/scale-to-width-down/340?cb=20120610182912&path-prefix=pt-br"
            },
            content: "Eu acredito em você! você consegue!! Ignora esses dois recalcados"
          }

        ]
      },
      {
        id: 2,
        author: {
          name: "Kiba",
          avatar: "https://www.einerd.com.br/wp-content/uploads/2018/02/kiba-akamaru-890x501.jpg",
        },
        date: "27 jan 2020",
        content: "Gente, alguém sabe qual o petshop mais barato de Konoha?",
        comments: []
      }
    ]
  };
  render() {
    return (
      <div className="postlist">
        {this.state.posts.map(post => <PostItem key={post.id} {...post} />)}
      </div>
    )
  }
}

export default PostList;