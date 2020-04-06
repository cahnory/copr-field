import React, { useState } from 'react';
import { CoprForm } from '@copr-field/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { createUser } from './form/forms';
import Form from './components/Form';

export default function App() {
  const [values, setValues] = useState();

  return (
    <div className="container-sm">
      <h1 className="mt-5">
        <span role="img" aria-hidden>
          ✨
        </span>{' '}
        copr-field
      </h1>
      <ul className="links">
        <li>
          <a href="https://github.com/cahnory/copr-field">github</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/copr-field">copr-field</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/@copr-field/react">
            @copr-field/react
          </a>
        </li>
      </ul>
      <CoprForm copr={createUser}>
        <Form onSubmit={setValues} onSubmitError={() => setValues('ERROR')} />
      </CoprForm>
      {values && <pre className="mt-4">{JSON.stringify(values, null, 2)}</pre>}
    </div>
  );
}
