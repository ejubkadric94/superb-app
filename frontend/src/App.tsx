import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Content } from "antd/es/layout/layout"
import { Layout } from 'antd'
import { QueryClient, QueryClientProvider } from 'react-query'
import TableDetails from './modules/TableDetails'
import TablesList from './modules/TablesList'
import Header from './components/Header'
import './App.css'

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Header />
          <Content className="content">
            <Routes>
              <Route path="/" element={<TablesList />}  />
              <Route path="/table/:tableNumber" element={<TableDetails />} />
            </Routes>
          </Content>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
