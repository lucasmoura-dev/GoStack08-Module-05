import React, { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
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
  PageCount,
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
    repositoryState: 'all',
    repoName: '',
    page: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  async loadIssues() {
    const { repoName, repositoryState, page } = this.state;
    let url = `/repos/${repoName}/issues`;
    const issues = await api.get(url, {
      params: {
        state: repositoryState,
        per_page: 5,
        page,
      },
    });
    let hasNextPage =
      issues.headers.link && issues.headers.link.includes('next');
    this.setState({ issues: issues.data, hasNextPage });
  }

  handlePage = async action => {
    const { page } = this.state;
    if (page <= 1 && action !== 'next') {
      return;
    }
    await this.setState({
      page: action === 'next' ? page + 1 : page - 1,
    });
    await this.loadIssues();
  };

  handleRepositoryState = async e => {
    this.setState({ repositoryState: e.target.value, page: 1 });
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
    const {
      repository,
      issues,
      loading,
      repositoryState,
      page,
      hasNextPage,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <div>
            <Link to="/">
              <FaArrowLeft />
            </Link>
          </div>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueHeader>
          <IssueState
            onChange={this.handleRepositoryState}
            value={repositoryState}
          >
            <option value="all">Todas</option>
            <option value="open">Abertas</option>
            <option value="closed">Fechadas</option>
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
          <PaginationButton
            onClick={() => this.handlePage('back')}
            disabled={page <= 1}
          >
            Anterior
          </PaginationButton>
          <PageCount>{page}</PageCount>
          <PaginationButton
            onClick={() => this.handlePage('next')}
            disabled={!hasNextPage}
          >
            Próximo
          </PaginationButton>
        </IssueFooter>
      </Container>
    );
  }
}
