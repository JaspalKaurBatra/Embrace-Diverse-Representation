package ibm.cfce.mitigatealgorithmicbias.domain;

public class Blog {

    /**
     * Revision of the document in the cloudant database.
     * Cloudant will create this value for new documents.
     */
    private String _rev;

    /**
     * ID of the document in the cloudant database
     * Cloudant will create this value for new documents.
     */
    private String _id;

    private String user;

    private String title;

    private String content;

//    private String count;

    public String get_rev() {
        return _rev;
    }

    public void set_rev(String _rev) {
        this._rev = _rev;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
