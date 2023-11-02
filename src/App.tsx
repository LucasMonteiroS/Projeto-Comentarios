import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Definindo a estrutura de um comentário
interface Comment {
  author: string;
  text: string;
  timestamp: string;
}

const App: React.FC = () => {
  // Estado para controlar o autor do comentário
  const [author, setAuthor] = useState<string>('');
  // Estado para controlar o texto do comentário
  const [comment, setComment] = useState<string>('');
  // Estado para armazenar os comentários
  const [comments, setComments] = useState<Comment[]>([]);

  // Carregar os comentários do armazenamento local ao iniciar a aplicação
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments') || '[]') as Comment[];
    if (Array.isArray(storedComments) && storedComments.length > 0) {
      setComments(storedComments);
    }
  }, []);


  // Atualizar o armazenamento local sempre que os comentários mudarem
  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  // Lidar com o envio de um novo comentário
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (author && comment) {
      const newComment: Comment = {
        author,
        text: comment,
        timestamp: new Date().toLocaleString()
      };
      setComments([newComment, ...comments]);
      setAuthor('');
      setComment('');
    }
  };

  return (
    <div className='container-fluid'>
      <div className='centralizado'><h1 className='card-title'>Faça seus Comentários e interaja com a Comunidade!</h1></div>
      <div className='centralizado'>
        {/* Formulário para inserir um novo comentário */}
        <button type="button" className="btn btn-outline-dark cor" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Criar comentários
        </button>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Escreva agora mesmo o seu comentário!</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label card-title">Nome do Autor:</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label card-title">Digite seu comentário:</label>
                    <textarea
                      className="form-control"
                      placeholder="Escreva seu comentário"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-outline-dark">Enviar Comentário</button>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>

              </div>
            </div>
          </div>
        </div>

      </div>

      <div className='centralizado'><h1 className='card-title'>Total de Comentários: {comments.length}</h1></div>
      <div className='centralizado3'><div className="borda"></div></div>
      {/* Listar os comentários existentes */}
      <div>
        {comments.map((c: Comment, index: number) => (
          <div key={index}>
            <div className='centralizado2'>
              <div className="card">
                <div className="card-body">
                  <h3>{c.text}</h3>
                </div>
              </div>
            </div>
            <div className='centralizado2'>
              <h4>Comentado por: {c.author} em {c.timestamp}</h4>
            </div>
          </div>
        ))}
      </div>


      <div className="container my-5">

        <footer className="text-center text-lg-start text-white">

          <div className="text-center p-3 divf">
            © 2023 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/">Lucas Monteiro da Silva</a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default App;
