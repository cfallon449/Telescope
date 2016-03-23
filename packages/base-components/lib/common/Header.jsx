import NoSSR from 'react-no-ssr';
import Router from '../router.js'
import Core from "meteor/nova:core";
const Messages = Core.Messages;

const Header = ({currentUser}) => {
  
  ({Logo, ListContainer, CategoriesList, FlashContainer, FlashMessages, ModalButton, NewDocContainer, CanCreatePost, CurrentUserContainer, NewsletterForm, SearchForm} = Telescope.components);

  const logoUrl = Telescope.settings.get("logoUrl");
  const siteTitle = Telescope.settings.get("title", "Telescope");
  const tagline = Telescope.settings.get("tagline");

  return (
    <header className="header">
     <div className="logo">
        <Logo logoUrl={logoUrl} siteTitle={siteTitle} />
        {tagline ? <h2 className="tagline">{tagline}</h2> : "" }
      </div>
      <div className="nav">
        <ListContainer collection={Categories} limit={0}><CategoriesList/></ListContainer>
      </div>
      
      <LogInButtons />
      
      {currentUser ? <p><a href={Router.path("account")}>My Account</a></p> : ""}

      <CanCreatePost user={currentUser}>
        <ModalButton label="New Post" className="button button--primary">
          <NewDocContainer 
            collection={Posts} 
            label="New Post" 
            methodName="posts.new" 
            successCallback={(post)=>{
              Messages.flash("Post created.", "success");
              Router.go('posts.single', post);
            }}
          />
        </ModalButton>
      </CanCreatePost>

      <CurrentUserContainer component={NewsletterForm} />

      <SearchForm/>

      <FlashContainer component={FlashMessages}/>

    </header>
  )
}

module.exports = Header;