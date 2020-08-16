package ibm.cfce.mitigatealgorithmicbias.controller;

import com.cloudant.client.api.Database;
import com.cloudant.client.api.model.Response;
import ibm.cfce.mitigatealgorithmicbias.domain.Blog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/mitigate-algorithmic-bias/blog")
public class BlogController {

    @Autowired
    private Database db;

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody List<Blog> getAll() throws IOException {
        List<Blog> allDocs = db.getAllDocsRequestBuilder().includeDocs(true).build().getResponse().getDocsAs(Blog.class);
        return allDocs;
    }

    @RequestMapping(method = RequestMethod.GET, value="/{id}")
    public @ResponseBody Blog getGreeting(@PathVariable String id) throws IOException {
        Blog greeting = db.find(Blog.class, id);
        return greeting;
    }

    @RequestMapping(method = RequestMethod.POST, consumes = "application/json")
    public @ResponseBody String add(@RequestBody Blog greeting) {
        Response response = db.post(greeting);
        String id = response.getId();
        return id;
    }

}
