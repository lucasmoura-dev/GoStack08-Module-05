import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  IssueHeader,
  IssueState,
  IssueFooter,
  PaginationButton,
} from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    repositoryState: 'open',
    repoName: '',
  };

  async loadIssues() {
    const { repoName, repositoryState } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: repositoryState,
        per_page: 5,
      },
    });
    this.setState({ issues: issues.data });
  }

  handleRepositoryState = async e => {
    this.setState({ repositoryState: e.target.value });
    await this.loadIssues();
  };

  async componentDidMount() {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);

    const repository = await api.get(`/repos/${repoName}`);

    this.setState({
      repository: repository.data,
      loading: false,
      repoName: repoName,
    });

    this.loadIssues();
  }

  render() {
    const { repository, issues, loading, repositoryState } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueHeader>
          <IssueState
            onChange={this.handleRepositoryState}
            value={repositoryState}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="all">All</option>
          </IssueState>
        </IssueHeader>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <IssueFooter>
          <PaginationButton>Anterior</PaginationButton>
          <PaginationButton>Próximo</PaginationButton>
        </IssueFooter>
      </Container>
    );
  }
}
